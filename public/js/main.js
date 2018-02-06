angular.module('formK', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'angular-growl', 'ngMask'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {


    $httpProvider.interceptors.push('tokenInterceptor');

    $locationProvider.html5Mode(true);


    $routeProvider.when('/formulario', {
      templateUrl: 'partials/formulario.html',
      controller: 'formularioController'
    });

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    });

    $routeProvider.when('/telaInicio', {
      templateUrl: 'partials/telaInicio.html'
    });

    $routeProvider.when('/perguntas', {
      templateUrl: 'partials/perguntas.html'
    });

    $routeProvider.otherwise({
      redirectTo: '/telaInicio'
    });

  });
