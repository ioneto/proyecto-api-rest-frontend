'use strict';

/**
 * @ngdoc function
 * @name proyectoApiRestFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApiRestFrontendApp
 */
angular.module('proyectoApiRestFrontendApp')
    .controller('MainCtrl', function($scope, moment, alert, calendarConfig) {
        $scope.modalNewEvent = function(){
            alert.show('modalNewEvent.html');
        };

        var vm = $scope;
        var actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
            onClick: function(args) {
                alert.show('Edited', args.calendarEvent);
            }
        /*}, {
            label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            onClick: function(args) {
                alert.show('Deleted', args.calendarEvent);
            }*/
        }];
        vm.events = [
            {
                title: 'Draggable event',
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('month').toDate(),
                draggable: true,
                /*resizable: true,*/
                actions: actions
            },
            {
                title: 'Non-draggable event',
                color: calendarConfig.colorTypes.info,
                startsAt: moment().startOf('month').toDate(),
                draggable: false,
                /*resizable: true,*/
                actions: actions
            }
        ];
        vm.calendarView = 'year';
        vm.viewDate = moment().startOf('month').toDate();
        vm.cellIsOpen = true;

    });