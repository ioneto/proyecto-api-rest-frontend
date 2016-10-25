angular.module('proyectoApiRestFrontendApp')
    .factory('alert', function($uibModal) {
        function newReview(modalUrl,events) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource, calendarConfig){

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
                            $scope.newReview.start_date = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),startHour.getHours(),startHour.getMinutes(),0);
                            var endDate = $scope.newReview.end_date;
                            var endHour = $scope.newReview.end_hour;
                            $scope.newReview.end_date = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),endHour.getHours(),endHour.getMinutes(),0);
                            $scope.newReview = Review.save($scope.newReview);
                            $scope.newReview.$promise.then(function(){
                                var actions = [{
                                    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
                                    onClick: function(args) {
                                        alert.show('Edited', args.calendarEvent);
                                    }
                                }, {
                                    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
                                    onClick: function(args) {
                                        alert.show('Deleted', args.calendarEvent);
                                    }
                                }];

                                var review = $scope.newReview;
                                events.push({
                                    "id"       : review.id,
                                    "title"    : review.title+" ("+userSubject.subject.initials+")",
                                    "color.primary"    : review.primary_color,
                                    "color.secondary"  :review.secondary_color,
                                    "color"    : calendarConfig.colorTypes.important,
                                    "startsAt" : new Date(review.start_date),
                                    "endsAt"   : new Date(review.end_date),
                                    "draggable": true,
                                    "resizable": true,
                                    "actions"  : actions
                                });
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

        function editarReview(modalUrl, evento, events) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance, $scope, $resource, calendarConfig){

                    var UserSubjects = $resource('http://localhost:3000/users/:id/subjects', {id: 1});
                    $scope.userSubjects= UserSubjects.query();

                    cargarDatePicker($scope);

                    var Review = $resource('http://localhost:3000/reviews/:id', {id: evento.id});
                    var review = Review.get();
                    review.$promise.then(function(){
                        $scope.review = {};
                        $scope.review.id = review.id;
                        $scope.review.subject_id = review.user_subject.subject_id;
                        $scope.review.title = review.title;
                        $scope.review.primary_color = review.primary_color;
                        $scope.review.secondary_color = review.secondary_color;
                        $scope.review.start_date = new Date(review.start_date);
                        $scope.review.end_date = new Date(review.end_date);
                        $scope.review.start_hour = new Date(review.start_date);
                        $scope.review.end_hour = new Date(review.end_date);
                        $scope.review.score = review.score;
                        console.log(review);
                        console.log($scope.review);
                    });

                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    $scope.submitReview = function(){
                        var Review = $resource('http://localhost:3000/reviews/:idReview',
                            {idReview: $scope.review.id},
                            {update: { method:'PUT' }});
                        var startDate = $scope.review.start_date;
                        var startHour = $scope.review.start_hour;
                        $scope.review.start_date = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),startHour.getHours(),startHour.getMinutes(),0);
                        var endDate = $scope.review.end_date;
                        var endHour = $scope.review.end_hour;
                        $scope.review.end_date = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),endHour.getHours(),endHour.getMinutes(),0);
                        $scope.review = Review.update($scope.review);
                        $scope.review.$promise.then(function(){
                            var UserSubject = $resource('http://localhost:3000/user_subjects/:idUserSubject', {idUserSubject: $scope.review.user_subject_id});
                            var userSubject = UserSubject.get();
                            userSubject.$promise.then(function(){
                                console.log(userSubject);
                                var actions = [{
                                    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
                                    onClick: function(args) {
                                        $scope.modalEditarReview(args.calendarEvent);
                                    }
                                }, {
                                    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
                                    onClick: function(args) {
                                        alert.show('Deleted', args.calendarEvent);
                                    }
                                }];

                                var review = $scope.review;

                                for (var i = 0; i < events.length; i++) {
                                    if(events[i].id == review.id){
                                        events.splice(i,1);
                                    }
                                }

                                events.push({
                                    "id"       : review.id,
                                    "title"    : review.title+" ("+userSubject.ramos.initials+")",
                                    "color.primary"    : review.primary_color,
                                    "color.secondary"  :review.secondary_color,
                                    "color"    : calendarConfig.colorTypes.important,
                                    "startsAt" : new Date(review.start_date),
                                    "endsAt"   : new Date(review.end_date),
                                    "draggable": true,
                                    "resizable": true,
                                    "actions"  : actions
                                });
                                $uibModalInstance.dismiss('cancel');
                            })
                        });
                    }
                },
            });
        }

        function cargarDatePicker(scope){
            scope.today = function() {
                scope.review.start_date = new Date();
            };
            scope.clear = function() {
                scope.review.start_date = null;
            };
            scope.abrirFechaInicio = function() {
                scope.fechaInicio.opened = true;
            };
            scope.abrirFechaTermino = function() {
                scope.fechaTermino.opened = true;
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
            newSubject: newSubject,
            editarReview: editarReview
        };
    });