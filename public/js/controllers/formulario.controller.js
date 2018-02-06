angular.module('formK').controller('formularioController', function ($scope, growl, $http, $window, $location, InjecaoInfo, CidadeEstado, $routeParams) {

            /*============== Funcao para exibir as mensagens referentes ao banco =================*/
            function mensagem(msg, type, time) {
                growl.general(msg, {
                    ttl: time
                }, type);
            }

            $scope.mensagem = '';

            if ($window.sessionStorage.token != null && $window.sessionStorage.idUser != null) {


                $scope.userName = '';
                $scope.fomulario = '';
                $scope.locaisBanco = '';
                $scope.locais = '';
                $scope.pdf = false;
                $scope.check = {value: null};
                $scope.date = new Date();

                function getDadosUser () {
                    InjecaoInfo.getDadosUser($window.sessionStorage.idUser)
                        .success(function (result) {
                            $scope.userName = result.nome;
                            if (result.formulario != '') {
                                    $scope.formulario = result.formulario[0];
                                    $scope.locaisBanco = result.formulario[0].locais;
                                    $scope.check.value = result.formulario[0].aceite;
                                    if(result.formulario[0].uf){
                                        selecionarMunicipios(result.formulario[0].uf)
                                    }
                                    $scope.pdf = true;
                            }
                        }).error(function (erro) {
                            console.log(erro)
                        })
                };

                /*NOVO CIDADE-ESSTADO*/
                $scope.estados = CidadeEstado.selecionarEstados();

                $scope.SelecionarMunicipios = function(uf){
                    $scope.formulario.municipio = '';
                    $scope.municipios = CidadeEstado.SelecionarMunicipios(uf);
                }

                function selecionarMunicipios(uf){
                    $scope.municipios = CidadeEstado.SelecionarMunicipios(uf);
                }

                $("#rg").mask("9999999999");
                $("#cpf").mask("999.999.999-99");
                $("#cnpj").mask("99.999.999/9999-99");
                $("#populacao").mask("9999999");



                $scope.locais = []

                function teste(local) {
                    if (!local.latitude) {
                        local.latitude = "0.00000000"
                    }
                    if (!local.longitude) {
                        local.longitude = "0.00000000"
                    }
                     local = {
                        nome: local.nome,
                        latitude: $scope.sinal + local.latitude.replace(',','.'),
                        longitude: "-" + local.longitude.replace(',','.'),
                        populacao: local.populacao
                    }

                    return local
                }

                $scope.addLocal = function (local) {
                    $scope.msgLocalidadeInvalida = false;
                    if (local != undefined || local == "") {
                        console.log(local.nome != undefined && local.nome != '')
                        if ((local.nome != undefined && local.nome != '') && (local.latitude != undefined && local.latitude != '') && (local.longitude != undefined && local.longitude != '')) {
                            if ($scope.locais != "") {
                                var teste2 = teste(local)
                                    if((teste2.latitude > -34 && teste2.latitude < 6) || (teste2.longitude > -75 && teste2.longitude < -34) ){
                                       $scope.locais[0] = teste2
                                       delete $scope.local
                                    }else{

                                        var msg = "<strong>Erro!</strong><br>Sua latitude: <strong>" + teste2.latitude + "</strong> ou longitude: <strong>"+ teste2.latitude + "<strong> não coincidem com o território brasileiro." ;
                                        mensagem(msg, "error", 10000);
                                    }

                                $scope.locais[$scope.locais.length] = teste(local)
                                $scope.msgLocalidadeInvalida = false;

                            } else {
                                    var teste2 = teste(local)
                                    if((teste2.latitude > -34 && teste2.latitude < 6) || (teste2.longitude > -75 && teste2.longitude < -34) ){
                                       $scope.locais[0] = teste2
                                       delete $scope.local
                                    }else{
                                         var msg = "<strong>Erro!</strong><br>Sua latitude: <strong>" + teste2.latitude + "</strong> ou longitude: <strong>"+ teste2.latitude + "/<strong> não coincidem com o território brasileiro." ;
                                        mensagem(msg, "error", 10000);
                                    }


                            }
                        } else {
                            $scope.msgLocalidadeInvalida = true;
                            console.log('erro')
                        }
                    }


                }


                $scope.deleteLocal = function (index) {
                     $scope.locais.splice(index, 1);
                }

                $scope.deleteLocalBanco = function(local, index) {
                    var localidade = local.nome;
                     bootbox.confirm({
                    message: 'Deseja realmente excluir essa localidade?',
                    callback: function (confirmacao,index) {
                        if (confirmacao) {
                                   InjecaoInfo.deleteLocal(local.cod_localidade)
                            .success(function () {
                                var msg = "<strong>Excluído!</strong><br>A localidade <strong>" + localidade + "</strong> foi excluída com sucesso.";
                                mensagem(msg, "success", 5000);
                                        getDadosUser();
                            }).error(function (error) {
                                var msg = "<strong>Erro!</strong><br>Ocorreu um erro ao tentar excluir a localidade <strong>" + localidade + "</strong>. Por favor, tente novamente mais tarde.";
                                mensagem(msg, "error", 10000);
                            })

                        };
                    },
                    buttons: {
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-default'
                        },
                        confirm: {
                            label: 'EXCLUIR',
                            className: 'btn-danger'
                        }

                    }
                });



                };


                $scope.submitForm = function (formulario, locais) {

                    var formFull = {
                        cod_usuario: $window.sessionStorage.idUser,
                        nacionalidade_prefeito: formulario.nacionalidade_prefeito,
                        cnpj: formulario.cnpj,
                        cpf_prefeito: formulario.cpf_prefeito,
                        identidade_prefeito: formulario.identidade_prefeito,
                        municipio: formulario.municipio,
                        nome_prefeito: formulario.nome_prefeito,
                        uf: formulario.uf,
                        locais: locais,
                        telefone1: formulario.telefone1,
                        telefone2: formulario.telefone2,
                        email_prefeito: formulario.email_prefeito,
                        orgao_expedidor: formulario.orgao_expedidor,
                        residencia_prefeito: formulario.residencia_prefeito
                    }


                    if ($scope.formPI.$valid) {
                        $scope.msgFormValido = true
                    } else {
                        $scope.msgFormValido = false
                    }


                    for (var i = 0; i < locais.length; i++) {
                        if (($scope.locais[i].nome == undefined || $scope.locais[i].nome == '') || ($scope.locais[i].populacao == undefined || $scope.locais[i].populacao == '')) {
                            $scope.msgLocalidadeInvalida = true

                            break;
                        } else {
                            $scope.msgLocalidadeInvalida = false
                        }
                    }
                    getDadosUser();
                    $scope.usuarioID;
                    if ($scope.formulario.cod_usuario == null) {

                        if (($scope.msgLocalidadeInvalida == undefined || $scope.msgLocalidadeInvalida == false) && $scope.msgFormValido == true) {
                          console.log("POST")

                            $http.post("/ipt/formulario", formFull)
                                .success(function () {
                                $scope.locais = '';
                                    getDadosUser();
                                    var msg = "<strong>Cadastrado!</strong><br>O termo de adesão de foi cadastrado com sucesso.";
                                    mensagem(msg, "success", 5000);
                                }).error(function (error) {
                                    var msg = "<strong>Error!</strong><br>O termo de adesão não pode ser cadastrado. Por favor, tente novamente mais tarde.";
                                    mensagem(msg, "error", 10000);
                                    console.log("n foi")
                                    console.log(error)
                                })
                        } else {
                            console.log('form= ' + $scope.msgFormValido,'localidade= ' + $scope.msgLocalidadeInvalida)
                        }

                    } else {
                        console.log($scope.msgLocalidadeInvalida == undefined, $scope.msgLocalidadeInvalida == false, $scope.msgFormValido == true)
                         if (($scope.msgLocalidadeInvalida == undefined || $scope.msgLocalidadeInvalida == false) && $scope.msgFormValido == true) {
                            $http.put("/ipt/formulario/" + formulario.cod_entidade, formFull)
                                .success(function () {
                                $scope.locais = '';
                                getDadosUser();
                                var msg = "<strong>Atualizado!</strong><br>O termo de adesão foi atualizado com sucesso.";
                                mensagem(msg, "success", 5000);
                                }).error(function (error) {
                                    var msg = "<strong>Error!</strong><br>O termo de adesão não pode ser atualizado. Por favor, tente novamente mais tarde.";
                                    mensagem(msg, "error", 10000);
                                    console.log(error)
                                })
                        } else {
                            console.log('form= ' + $scope.msgFormValido,'localidade= ' + $scope.msgLocalidadeInvalida)
                        }
                    }

                };

                    $scope.logout = function () {
                        if($scope.formPI.$dirty || $scope.locais != ""){
                        bootbox.confirm({
                            message: 'Deseja fazer logout sem salvar as alterações',
                            callback: function (confirmacao,index) {
                                if (confirmacao) {
                                    delete $window.sessionStorage.token;
                                    delete $window.sessionStorage.idUser;
                                    $location.path("/login");
                                    getDadosUser();
                                };
                            },
                            buttons: {
                                cancel: {
                                    label: 'Cancelar',
                                    className: 'btn-default'
                                },
                                confirm: {
                                    label: 'Sim',
                                    className: 'btn-danger'
                                }

                            }
                        });
                            }else{
                                delete $window.sessionStorage.token;
                                delete $window.sessionStorage.idUser;
                                $location.path("/login");
                            }
                    }

                   function genPdf() {
                        $('#spanLoading').removeClass('hide');
                        $('#btnPdf').prop( "disabled", true );

                        var check = {aceite: $scope.check.value};
                        var cod_entidade = $scope.formulario.cod_entidade;
                        if(check.aceite === 1){
                            $http.put('ipt/aceitarTermo/' + cod_entidade, check)
                            .success(function () {
                                var teste = new XMLHttpRequest();

                                teste.onreadystatechange = function(){
                                    if(teste.readyState == 4 && teste.status == 200){
                                        $window.location.href = 'pdf/'+$window.sessionStorage.idUser+'/'+$window.sessionStorage.token;
                                        $('#spanLoading').addClass('hide');
                                        $('#btnPdf').prop( "disabled", false );
                                    }
                                    if(teste.status == 401 || teste.status == 500 ){
                                        var msg = "<strong>Erro!</strong><br>O termo de adesão não pode ser baixado. Por favor, tente novamente mais tarde.";
                                        mensagem(msg, "error", 10000);
                                        $('#spanLoading').addClass('hide');
                                        $('#btnPdf').prop( "disabled", false );
                                    }
                                }
                                teste.open('head', 'pdf/'+$window.sessionStorage.idUser+'/'+$window.sessionStorage.token);
                                teste.send();
                            }).error(function(){
                                var msg = "<strong>Erro!</strong><br>O termo de adesão não pode ser baixado. Por favor, tente novamente mais tarde.";
                                mensagem(msg, "error", 10000);
                                $('#spanLoading').addClass('hide');
                                $('#btnPdf').prop( "disabled", false );
                            });
                        }else{
                            var msg = "<strong>Aviso!</strong><br>É necessário concordar com os termos para fazer o download do documento.";
                            mensagem(msg, "warning", 10000);
                            $('#spanLoading').addClass('hide');
                            $('#btnPdf').prop( "disabled", false );
                        };
                    };

                $scope.sinal = '-';
                $scope.trocaSinal = function(){
                    if($scope.sinal == '+'){
                        $scope.sinal = '-'
                    }else{
                        $scope.sinal = '+'
                    }
                }
                    $scope.baixarPdf = function () {
                        genPdf();
                    };

                  /*console.log( $scope.check.value )*/

                      /*  $scope.printDiv = function(print) {

                           var lines = document.getElementById('termAde').innerHTML.split("\n");
                            var cortado = 17;
                            var parte = [];

                            for (var key in lines) {

                                if(key < cortado){
                                     parte[key] = lines[key]


                                    if(lines[key] == '' ){
                                       parte[key] = "<br>"
                                    }


                                }
                            }

                          var printContents = parte.join()

                           for(var i = 0;i < printContents.length; i ++){
                            var printContents =  printContents.replace(/>,</,'><');
                          }

                          var popupWin = window.open();
                            console.log(popupWin)
                          popupWin.document.open();
                          popupWin.document.write('<html><head></head><body onload="window.print()"><div style="margim:200px">'+ printContents +'</div></body></html>');
                          popupWin.document.close();
} */

                $(document).ready(function () {
                $('#cpf').mask('999.999.999-99');
                $('#processo').mask('99999.99999/9999-99');
            });

                 getDadosUser();

                } else {
                    $location.path('/login');
                }

            });
