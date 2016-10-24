angular.module('proyectoApiRestFrontendApp')
    .factory('alert', function($uibModal) {

        function newReview(modalUrl,users,subjects,Review) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    //var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'});
                        //$scope.users= Users.get({userId: user_id});

                    var rew = $resource('http://localhost:3000/users/1/subjects/1/reviews/:id', 
                        {id:'@id'},{specialAction: {method: 'POST'}});

                    $scope.users=users;//Users.get({userId: user});
                    $scope.subjects=subjects;
                    $scope.Review=Review; 
                    $scope.newReview={};
                    $scope.newReview.colorSecondary='#f0fb28';
                    $scope.reviews=[];  


                    $scope.modalShowUser = function(){
                        //$scope.reviews.push($scope.newReview);
                        console.log($scope.newReview);
                        //grunt.log.write("hola");
                        rew.specialAction($scope.newReview);
                        showReview('modalShow.html',$scope.newReview, $scope.users);
                    }                 
                },
            });
        }

        function showReview(modalUrl,reviews,users) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    //var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'});
                        //$scope.users= Users.get({userId: user_id});
                    $scope.users=users;
                    $scope.reviews=reviews;
               
                },
            });
        }

        function registerUserSubject(modalUrl) {
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
                        });
                    }

                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    /*$scope.users=users;
                    $scope.subject={};
                    $scope.us=us;
                    //$scope.subjects=[];
                    $scope.sub=[];
                    var a=[];

                    var Subjects = $resource('http://localhost:3000/subjects/:subjectId/', 
                        {subjectId:'@id'});
                    $scope.subjects = Subjects.query()/*function(){
                        $scope.subjects=ramos;
                        //$scope.ramos=ramos;
                        for (var x = 0, lent = $scope.users.subjects.length; x < lent; x++){
                            for (var i = 0, len = ramos.length; i < len; i++){
                                if($scope.users.subjects[x].sigla==ramos[i].sigla){
                                    a.push(i)
                                   console.log(a);                       
                                }
                            }
                        } 

                        console.log(ramos.length-a.length);

                        for (var x = 0, lent = a.length; x < lent; x++){
                            for (var i = 0, len = ramos.length; i < len; i++){
                                if(a[x]!=i){
                                    $scope.sub.push(ramos[i]);                                                          
                                }
                            }
                        } 

                        console.log($scope.subjects);
                    });*/
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

        return {
            newReview: newReview,
            showReview: showReview,
            registerUserSubject: registerUserSubject,
            newSubject: newSubject
        };
    });