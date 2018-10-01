(function initCadetList() {
  // Usage:
  // 
  // Creates: A list of Cadet
  // 

  angular
    .module('cadet')
    .component('cadetList', {
      templateUrl: './app/users/cadet/cadet-list/cadet-list.html',
      controller: CadetListController,
      controllerAs: 'vmCadet',
      bindings: {
        cadets: '<',
      },
    });

  CadetListController.$inject = ['$transition$'];
  /* @ngInject */
  function CadetListController($transition$) {
    var vmCadet = this;
    
    ////////////////

    vmCadet.$onInit = () => {
      const to = vmCadet.$transition$.to();
      const toParams = vmCadet.$transition$.params("to");
      const from = vmCadet.$transition$.from();
      const fromParams = vmCadet.$transition$.params("from");
    };
    vmCadet.$onChanges = function(changesObj) { };
    vmCadet.$onDestroy = function() { };
  }
})();