'use strict';

/**
 * @ngdoc overview
 * @name proyectoApiRestFrontendApp
 * @description
 * # proyectoApiRestFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('proyectoApiRestFrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mwl.calendar',
    'ui.bootstrap',
    'restangular',
    'angular.filter'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/asignaturas', {
        templateUrl: 'views/asignaturas.html',
        controller: 'AsignaturasCtrl',
        controllerAs: 'asignaturas'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
        .when('/contact',{
            templateUrl: 'views/contacto.html',
            controller: 'ContactoCtrl',
            controllerAs: 'contacto'
        })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

      $(".nav a").on("click", function(){
          $(".nav").find(".active").removeClass("active");
          $(this).parent().addClass("active");
      });

  });
