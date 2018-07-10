angular.module('ipt', [ 'ngAnimate', 'ngRoute', 'angular-growl', 'ngMask', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/formulario', {
      templateUrl: 'partials/formulario.html',
      controller: 'formularioController'
    });

    $routeProvider.otherwise({
      redirectTo: '/formulario'
    });

  });
