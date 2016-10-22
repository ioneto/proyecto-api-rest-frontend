angular.module('proyectoApiRestFrontendApp')
    .factory('alert', function($uibModal) {
        function show(modalUrl) {
            return $uibModal.open({
                templateUrl: modalUrl,
                controller: function($uibModalInstance ,$scope, Restangular){
                    $scope.closeModal = function(){
                        $uibModalInstance.dismiss('cancel');
                    }

                    $scope.submitModal = function(){
                        var peticion = Restangular.all('subjects');

                        peticion.getList().then(function(subjects) {
                            $scope.titulo = subjects;
                        });

                        $scope.titulo = Restangular.all('subjects').getList().$object;

                        var newReview = {
                            user_subject_id: $scope.asignatura,
                            fechaEvaluacion: $scope.fecha
                        };

                        //peticion.post(newReview);
                        alert($scope.titulo);
                    }
                },
            });
        }

        return {
            show: show
        };
    });