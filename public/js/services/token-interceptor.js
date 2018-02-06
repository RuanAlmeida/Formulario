angular.module('formK').factory('tokenInterceptor', function($q, $window, $location) {

        var interceptor = {};

        interceptor.request = function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['x-access-token'] = $window.sessionStorage.token;
            }
            return config;
        },

        interceptor.response = function (response, $rootScope) {
            var token = response.headers('x-access-token');
            var idUser = response.headers('idUser');                
            if (token != null && idUser != null) {
                $window.sessionStorage.token = token;
                $window.sessionStorage.idUser = idUser;
            }
            return response;
        },

        interceptor.responseError = function(rejection) {
            if (rejection != null && rejection.status === 401) {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.idUser;
                $location.path("/login");
            } 
            return $q.reject(rejection);
        }

    return interceptor;
    
});