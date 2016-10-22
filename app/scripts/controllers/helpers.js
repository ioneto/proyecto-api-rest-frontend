angular
  .module('proyectoApiRestFrontendApp')
  .factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          //console.log("hika");
          var vm = this;
          vm.action = action;
          vm.event = event;
          vm.hola=event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  });