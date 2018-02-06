(function () {
    'use strict';
    angular.module('formK').service('InjecaoInfo', InjecaoInfo); //Define o nome a função do seu .service
    InjecaoInfo.$inject = ['$http']; //Lista de dependências
    function InjecaoInfo($http, $routeParams) {
        var vm = this;

        vm.getDadosUser = getDadosUser;
        vm.deleteLocal = deleteLocal;
        vm.ufSelect = ufSelect;
        vm.putDadosUser = putDadosUser;
        
        function getDadosUser(idUser) {
            return  $http.get('ipt/formulario/' + idUser);
        }

        function putDadosUser(dadosUser){
            return $http.put('/ipt/formulario', dadosUser);
        }
        
        
        function deleteLocal(idLocal) {
            return $http.delete('ipt/localidade/' + idLocal);
        }
        
        
        var estados = [{index:1, uf:'AC'},
                       {index:2, uf:'AL'},
                       {index:3, uf:'AM'},
                       {index:4, uf:'AP'},
                       {index:5, uf:'BA'},
                       {index:6, uf:'CE'},
                       {index:7, uf:'DF'},
                       {index:8, uf:'ES'},
                       {index:9, uf:'GO'},
                       {index:10, uf:'MA'},
                       {index:11, uf:'MG'},
                       {index:12, uf:'MS'},
                       {index:13, uf:'MT'},
                       {index:14, uf:'PA'},
                       {index:15, uf:'PB'},
                       {index:16, uf:'PE'},
                       {index:17, uf:'PI'},
                       {index:18, uf:'PR'},
                       {index:19, uf:'RJ'},
                       {index:20, uf:'RN'},
                       {index:21, uf:'RO'},
                       {index:22, uf:'RR'},
                       {index:23, uf:'RS'},
                       {index:24, uf:'SC'},
                       {index:25, uf:'SP'},
                       {index:26, uf:'SE'},
                       {index:27, uf:'TO'}
                      ]
        
        function ufSelect(uf) {
            var numSeclet = null;
            for (var x = 0; x < estados.length; x++){
                if (uf == estados[x].uf) {
                    numSeclet = estados[x].index;
                    break;
                }
            }
            return numSeclet;
        }
        
    }
})();
//