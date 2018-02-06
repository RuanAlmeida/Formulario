angular.module('formK').controller('loginController', function($scope, growl, $http, $location, $window) {
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {ttl: time}, type);
    }
    
    $scope.user = {};
    
    $scope.login = function(){
        var user = $scope.user;
        
        $http.post('ipt/usuario', user)
        .success(function(){
            $location.path('/formulario');
        })
        .error(function(erro){
            delete $scope.user;
            var msg = "<strong>Erro!</strong><br><p>Login ou senha incorretos.</p>";
            mensagem(msg, 'error', 10000);
        })
    }
});