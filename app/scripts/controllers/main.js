'use strict';

/**
 * @ngdoc function
 * @name proyectoApiRestFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApiRestFrontendApp
 */
angular.module('proyectoApiRestFrontendApp')
    .controller('MainCtrl', function($scope,$resource,moment, alert, calendarConfig) {
        $scope.modalRegisterUserSubject = function(){
            alert.registerUserSubject('modalRegisterUserSubject.html');
        };

        $scope.modalNewReview = function(){
            alert.newReview('modalNewReview.html',$scope.users,$scope.subjects);
        };

        $scope.calendarView = 'year';
        $scope.viewDate = moment().startOf('month').toDate();
        $scope.cellIsOpen = true;

    });