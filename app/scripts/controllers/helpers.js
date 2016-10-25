angular.module('proyectoApiRestFrontendApp')
    .factory('alert', function($uibModal) {
        function newReview(modalUrl) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){

                    var UserSubjects = $resource('http://localhost:3000/users/:id/subjects', {id: 1});
                    $scope.userSubjects= UserSubjects.query();
                    $scope.newReview = {};
                    $scope.newReview.primary_color = '#1e90ff';
                    $scope.newReview.secondary_color = '#d1e8ff';
                    $scope.newReview.start_date = new Date();
                    $scope.newReview.end_date = new Date();
                    cargarDatePicker($scope);

                    $scope.saveReview = function(){
                        var Review = $resource('http://localhost:3000/reviews/:id', {id: '@id'});
                        var UserSubjects = $resource('http://localhost:3000/users/:user_id/user-subjects/subjects/:subject_id', {user_id: 1, subject_id: $scope.newReview.subject_id});
                        var userSubject = UserSubjects.get();
                        userSubject.$promise.then(function(){
                            $scope.newReview.user_subject_id = userSubject.id;
                            var startDate = $scope.newReview.start_date;
                            var startHour = $scope.newReview.start_hour;
                            startHour.setHours(startHour.getHours() - 3);
                            $scope.newReview.start_date = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),startHour.getHours(),startHour.getMinutes(),0);
                            var endDate = $scope.newReview.end_date;
                            var endHour = $scope.newReview.end_hour;
                            endHour.setHours(endHour.getHours() - 3);
                            $scope.newReview.end_date = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),endHour.getHours(),endHour.getMinutes(),0);
                            console.log($scope.newReview);
                            $scope.newReview = Review.save($scope.newReview);
                            $scope.newReview.$promise.then(function(){
                                $uibModalInstance.dismiss('cancel');
                            });
                        });
                    }

                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }
                },
            });
        }

        function registerUserSubject(modalUrl,vista) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance, $scope, $resource){

                    var User = $resource('http://localhost:3000/users/:id');
                    var Subjects = $resource('http://localhost:3000/subjects');
                    var UserSubjects = $resource('http://localhost:3000/users/:id/user-subjects');

                    $scope.users = User.get({id: 1});
                    $scope.subjects = Subjects.query();
                    $scope.subjects.$promise.then(function(){
                        $scope.userSubjects = UserSubjects.query({id: 1});
                        $scope.userSubjects.$promise.then(function() {
                            for (var i = 0; i < $scope.userSubjects.length; i++) {
                                for(var j = 0; j < $scope.subjects.length; j++){
                                    if($scope.userSubjects[i].subject_id == $scope.subjects[j].id){
                                        $scope.subjects.splice(j,1);
                                    }
                                }
                            }
                        });
                    });

                    $scope.newUserSubject = {};

                    $scope.modalNewSubject = function(){
                        newSubject('modalNewSubject.html',$scope.subjects)
                    };

                    $scope.saveUserSubject = function(){
                        $scope.newUserSubject.user_id = 1;
                        var UserSubject = $resource('http://localhost:3000/users/:idUser/subjects/:idSubject', {idUser: $scope.newUserSubject.user_id, idSubject: $scope.newUserSubject.subject_id});
                        var newUserSubject = UserSubject.save($scope.newUserSubject);
                        newUserSubject.$promise.then(function(){
                            $uibModalInstance.dismiss('cancel');
                            return newUserSubject.semester;
                        });
                    }

                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }
                },
            });
        }

        function newSubject(modalUrl,subjects) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance, $scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    $scope.saveSubject = function(){
                        var Subject = $resource('http://localhost:3000/subjects/:id', {id: '@id'});
                        var newSubject = Subject.save($scope.newSubject);
                        newSubject.$promise.then(function(){
                            subjects.push(newSubject);
                            $uibModalInstance.dismiss('cancel');
                        });
                    }
                },
            });
        }

        function cargarDatePicker(scope){
            scope.today = function() {
                scope.newReview.start_date = new Date();
            };
            scope.clear = function() {
                scope.newReview.start_date = null;
            };
            scope.abrirFechaInicio = function() {
                scope.fechaInicio.opened = true;
            };
            scope.abrirFechaTermino = function() {
                scope.fechaTermino.opened = true;
            };
            scope.setDate = function(year, month, day) {
                scope.newReview.start_date = new Date(year, month, day);
            };
            scope.format = 'dd/MM/yyyy'
            scope.fechaInicio = {
                opened: false
            };
            scope.fechaTermino = {
                opened: false
            };

        }

        return {
            newReview: newReview,
            registerUserSubject: registerUserSubject,
            newSubject: newSubject
        };
    });