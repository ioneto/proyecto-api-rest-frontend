'use strict';

/**
 * @ngdoc function
 * @name proyectoApiRestFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApiRestFrontendApp
 */
angular.module('proyectoApiRestFrontendApp')
    .controller('AsignaturasCtrl', function($scope, $resource, alert) {

        $scope.semester = "2016-2";
        var SemesterSubjects = $resource('http://localhost:3000/users/:id/subjects/:semester', {id: 1, semester: $scope.semester});
        var UserSubjects = $resource('http://localhost:3000/users/:id/user-subjects/', {id: 1});
        $scope.semesterSubjects = SemesterSubjects.query();
        $scope.userSubjects = UserSubjects.query();

        $scope.updateSubjectsTable = function(){
                var SemesterSubjects = $resource('http://localhost:3000/users/:id/subjects/:semester', {id: 1, semester: $scope.semester});
                $scope.semesterSubjects = SemesterSubjects.query();
        }

        $scope.eliminarSubject = function(idSubject){
                var UserSubject = $resource('http://localhost:3000/users/:idUser/subjects/:idSubject', {idUser: 1, idSubject: idSubject});
                var userDeleted = UserSubject.delete();
                userDeleted.$promise.then(function(){
                        var SemesterSubjects = $resource('http://localhost:3000/users/:id/subjects/:semester', {id: 1, semester: $scope.semester});
                        $scope.semesterSubjects = SemesterSubjects.query();
                });
        }

        $scope.modalRegisterUserSubject = function(){
                alert.registerUserSubject('modalRegisterUserSubject.html',$scope.semesterSubjects,$scope.semester);
        };
    });