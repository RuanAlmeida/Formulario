(function () {
    'use strict';
    angular.module('ipt').service('InjecaoInfo', InjecaoInfo); //Define o nome a função do seu .service
    InjecaoInfo.$inject = ['$http']; //Lista de dependências
    function InjecaoInfo($http, $routeParams) {
        var vm = this;

        vm.getEstado = getEstado;
        vm.getMunicipio = getMunicipio;
        vm.putForm = putForm;
        vm.fitroGeral = fitroGeral;
      
        
        function getEstado() {
            return  $http.get('/ipt/estados');
        }
        
        function getMunicipio(uf) {
            return  $http.get('/ipt/municipios/' + uf);
        }
        
        function putForm(form) {
            return  $http.put('/ipt/form', form);
        }        
    }
    
      function fitroGeral(form, est, estAnterior, muni, muniCont, emailEnv, recibOfi, linkEnv, terAde, termOk, minSei) {
            var selectMunicipio = false;
            /*IF para filtro do estado*/

            if (est) {
                for (var a = 0; a < form.length; a++) {
                    if (form[a].uf != est) {
                        form[a] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do municipio*/

            if (muni && (est == estAnterior)) {
                for (var b = 0; b < form.length; b++) {
                    if (form[b].cod_ibge != muni) {
                        form[b] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            } else {
                selectMunicipio = true;
            }

            /*IF para filtro do municipio contatado*/

            if (muniCont) {
                for (var c = 0; c < form.length; c++) {
                    if (form[c].municipio_contatado != muniCont) {
                        form[c] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do oficio enviado*/

            if (emailEnv) {
                for (var d = 0; d < form.length; d++) {
                    if (form[d].oficio_enviado != emailEnv) {
                        form[d] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do oficio recebido*/

            if (recibOfi) {
                for (var e = 0; e < form.length; e++) {
                    if (form[e].oficio_recebido != recibOfi) {
                        form[e] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do link enviado*/

            if (linkEnv) {
                for (var f = 0; f < form.length; f++) {
                    if (form[f].link_enviado != linkEnv) {
                        form[f] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do termo de adesao*/

            if (terAde) {
                for (var g = 0; g < form.length; g++) {
                    if (form[g].termo_adesao != terAde) {
                        form[g] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do Termo Ok*/

            if (termOk) {
                for (var g = 0; g < form.length; g++) {
                    if (form[g].termo_ok != termOk) {
                        form[g] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }

            /*IF para filtro do Bunda do ministro*/

            if (minSei) {
                for (var g = 0; g < form.length; g++) {
                    if (form[g].ass_sei != minSei) {
                        form[g] = null;
                    }
                }

                form = $.grep(form, function (n) {
                    return n == 0 || n
                })
            }
            return {form: form, selectMunicipio: selectMunicipio};
        }
    
})();