'use strict';

/**
 * @ngdoc function
 * @name proyectoApiRestFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApiRestFrontendApp
 */
angular.module('proyectoApiRestFrontendApp')
    .controller('MainCtrl', function($scope, $location,moment, calendarConfig) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.pruebaAlert = function (){
            alert("probando");
        };

        initCalendar($scope);

    });

function initCalendar(scope){
    scope.calendarView = 'month';
    scope.viewDate = new Date();
    scope.events = [];
}