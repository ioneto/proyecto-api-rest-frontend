angular.module('proyectoApiRestFrontendApp')
    .factory('alert', function($uibModal) {
        function show(modalUrl) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    $scope.submitModal = function(){
                        var Review = $resource('http://localhost:3000/reviews/:reviewId');

                    }
                },
            });
        }

        function showUsers(modalUrl,hola) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'}); 
                    $scope.userOne= Users.get({userId:1});
                    $scope.users= Users.query();
                    $scope.hola=hola;

                    $scope.modalShowUser = function(){
                        showUser('modalShowUser.html');
                    };


                    $scope.submitModal = function(){

                    }
                },
            });
        }

        function showUser(modalUrl,user,users) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    $scope.users=users;
                    $scope.user_id=user;

                    $scope.findUser = function(){
                        var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'});
                        var users= Users.get({userId: $scope.user_id});
                        showUserFind('modalShowUser.html',$scope.user_id, users);
                    };

                    /*$scope.findUser = function(){
                        var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'});
                        $scope.users= Users.get({userId: user_id});
                        showUserFind('modalShowUser.html',user_id,users)
                    }*/

                   
                },
            });
        }

        function showUserFind(modalUrl,user,users) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, $resource){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    //var Users = $resource('http://localhost:3000/users/:userId', {userId:'@id'});
                        //$scope.users= Users.get({userId: user_id});

                    $scope.users=users;//Users.get({userId: user});
                    $scope.user_id=user;                   
                },
            });
        }

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



        return {
            show: show,
            showUsers: showUsers,
            showUser: showUser,
            newReview: newReview,
            showReview: showReview
        };
    });