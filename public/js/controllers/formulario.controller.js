angular.module('ipt').controller('formularioController', function ($scope, growl, $http, InjecaoInfo) {

    $scope.forms = [];
    $scope.formFiltrado = [];
    $scope.filteredTodos = [];
    $scope.itemsPerPage = 30;
    $scope.currentPage = 4;
    $scope.buscarUf = '';

    $scope.simNao = [{
        value: 'Sim'
    }, {
        value: 'Não'
    }];
    $scope.termOkAba = [{
        value: 'Sim'
    }, {
        value: 'Não'
    }, {
        value: 'Notificado'
    }, {
        value: 'Atualizado'
    }];
    $scope.ofiEnv = [{
        value: 'Email respondido'
    }, {
        value: 'Email voltou'
    }, {
        value: 'Sim'
    }, {
        value: 'Não'
    }];
    $scope.link = [{
        value: 'Email voltou'
    }, {
        value: 'Sim'
    }, {
        value: 'Não'
    }]


    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    };

    function getForm() {
        $http.get('ipt/form')
            .success(function (data) {
                $scope.forms = data;
                $scope.formFiltrado = data;
                $scope.figureOutTodosToDisplay();
            })
            .error(function () {

            })
    }

    function getOnlyForm() {
        $http.get('ipt/form')
            .success(function (data) {
                $scope.forms = data;
            })
            .error(function () {

            })
    }

    $scope.cleanFilter = function () {
        getOnlyForm();
        $scope.est = null;
        $scope.muni = null;
        $scope.muniCont = null;
        $scope.emailEnv = null;
        $scope.recibOfi = null;
        $scope.linkEnv = null;
        $scope.terAde = null;
        $scope.termOk = null;
        $scope.minSei = null;
        $scope.formFiltrado = $scope.forms;
        $scope.figureOutTodosToDisplay();
    }

    $scope.somosFodas = function (form, index) {
        $scope.filteredTodos[index].municipio_contatado = "Sim";
        $scope.filteredTodos[index].oficio_enviado = "Sim";
        $scope.filteredTodos[index].oficio_recebido = "Sim";
        if ($scope.filteredTodos[index].link_enviado != 'Sim' && $scope.filteredTodos[index].link_enviado != 'Email voltou') {
            $scope.filteredTodos[index].link_enviado = "Não";
        }
        $scope.filteredTodos[index].termo_adesao = "Não";
        if ($scope.filteredTodos[index].solicitante == '' || $scope.filteredTodos[index].solicitante == null || $scope.filteredTodos[index].solicitante == '0') {
            $scope.filteredTodos[index].solicitante = "Prefeitura";
        }
    }

    var estAnterior = '';
    $scope.filtroGeral = function () {
        getOnlyForm();
        var est = $scope.est,
            muni = $scope.muni,
            muniCont = $scope.muniCont,
            emailEnv = $scope.emailEnv,
            recibOfi = $scope.recibOfi,
            linkEnv = $scope.linkEnv,
            terAde = $scope.terAde,
            form = $scope.forms;
        termOk = $scope.termOk;
        minSei = $scope.minSei;
        var result = InjecaoInfo.fitroGeral(form, est, estAnterior, muni, muniCont, emailEnv, recibOfi, linkEnv, terAde, termOk, minSei);
        if (result.selectMunicipio) {
            $scope.selectMunicipio(est);
        }
        $scope.formFiltrado = result.form;
        $scope.figureOutTodosToDisplay();
        estAnterior = est;
    };

    $scope.figureOutTodosToDisplay = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredTodos = $scope.formFiltrado.slice(begin, end);
    };

    getForm();

    $scope.pageChanged = function () {
        $scope.figureOutTodosToDisplay();
    };

    function getEstados() {
        InjecaoInfo.getEstado()
            .success(function (data) {
                $scope.estados = data;
            })
            .error(function (erro) {
                console.log(erro);
            });
    }

    $scope.selectMunicipio = function (est) {
        InjecaoInfo.getMunicipio(est)
            .success(function (data) {
                $scope.municipios = data;
            })
            .error(function (erro) {
                console.log(erro);
            });
    }

    $scope.submeter = function (form) {
            if ($scope.formIpt.$valid) {
                InjecaoInfo.putForm(form)
                    .success(function () {
                        var msg = "<strong>Atualizado!</strong><br>Os dados foram atualizados com sucesso.";
                        mensagem(msg, "success", 5000);
                    })
                    .error(function (erro) {
                        console.log(erro);
                        var msg = "<strong>Error!</strong><br>Não foi possivel atualizar os dados.";
                        mensagem(msg, "error", 10000);
                    });
            } else {
                var msg = "<strong>Aviso!</strong><br>Verifique se o valor do campo <strong>Número SEI</strong> do município <strong>" + form.nome_municipio + "-" + form.uf + "</strong> está correto. Letras e espaços em branco não são permitidos.";
                mensagem(msg, "warning", 10000);
            }
    };

    $scope.estadoFilter = function (est) {
        $http.get('ipt/filtro/' + est + '/' + muni)
            .success(function (filtro) {
                $scope.filtrados = filtro;

            })
            .error(function (erro) {
                console.log(erro);
            });
    }
    getEstados();
});