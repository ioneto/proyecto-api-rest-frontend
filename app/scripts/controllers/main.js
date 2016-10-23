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
        $scope.modalNewEvent = function(){
            alert.show('modalNewEvent.html');
        };        

        $scope.modalShowUsers = function(){
            alert.showUsers('modalShowUsers.html',$scope.hola);
        };

        $scope.modalShowUser = function(){
            alert.showUser('modalfindUser.html',$scope.user_id,{});
        };

        $scope.modalNewReview = function(){
            alert.newReview('modalNewReview.html',$scope.users,$scope.subjects);
        };

        var Users = $resource('http://localhost:3000/users/:userId/', {userId:'@id'});
        var Subjects = $resource('http://localhost:3000/users/:userId/subjects/:userSubjectId', 
            {userId:1,userSubjectId:'@id'});
        $scope.users= Users.get({userId: 1});
        $scope.subjects= Subjects.query();
        //$scope.Subjects=Subjects;



        $scope.hola=1;
        $scope.user_id=0;

        

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