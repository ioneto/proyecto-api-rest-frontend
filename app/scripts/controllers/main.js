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
            alert.newReview('modalNewReview.html',$scope.events);
        };

        $scope.modalEditarReview = function(evento){
            alert.editarReview('modalEditarReview.html',evento,$scope.events);
        };

        $scope.calendarView = 'year';
        $scope.viewDate = moment().startOf('month').toDate();

        $scope.eventClicked = function(event){
            alert.showReview('modalReview.html',event);
        }

        var UserSubjects = $resource('http://localhost:3000/users/:id/user-subjects', {id: 1});
        $scope.userSubjects = UserSubjects.query();
        $scope.userSubjects.$promise.then(function(){
            $scope.cellIsOpen = true;

            var actions = [{
                label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
                onClick: function(args) {
                    $scope.modalEditarReview(args.calendarEvent);
                }
            }, {
                label: '<i class=\'glyphicon glyphicon-remove\'></i>',
                onClick: function(args) {
                    alert.deleteReview('modalDelete.html', args.calendarEvent,$scope.events);
                }
            },
            {
            label: '<i class=\'glyphicon glyphicon-ok-sign\'></i>',
            onClick: function(args) {
                alert.registerScore('modalRegisterScore.html', args.calendarEvent);
            }
            }];

            $scope.events = [];

            for(var i = 0; i< $scope.userSubjects.length; i++) {
                for(var j=0; j<$scope.userSubjects[i].reviews.length; j++){
                    var review = $scope.userSubjects[i].reviews[j];
                    $scope.events.push({
                        "id"       : review.id,
                        "title"    : review.title+" ("+$scope.userSubjects[i].subject.initials+")",
                        "color.primary"    : review.primary_color,
                        "color.secondary"  :review.secondary_color,
                        "color"    : calendarConfig.colorTypes.important,
                        "startsAt" : new Date(review.start_date),
                        "endsAt"   : new Date(review.end_date),
                        "draggable": true,
                        "resizable": true,
                        "user_id"  : $scope.userSubjects[i].user_id,
                        "actions"  : actions
                    });
                }
            }
        });

    });