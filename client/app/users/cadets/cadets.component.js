(function initCadets() {
  // Usage:
  // 
  // Creates: A list of Cadet
  // 

  angular
    .module('users')
    .component('cadets', {
      templateUrl: './app/users/cadet/cadets/cadets.html',
      controller: CadetsController,
      controllerAs: 'cadetsVm',
      bindings: {
        cadets: '<',
      },
    });

  CadetsController.$inject = ['$transition$'];
  /* @ngInject */
  function CadetsController($transition$) {
    var cadetsVm = this;
    
    ////////////////

    cadetsVm.$onInit = () => {
      const to = cadetsVm.$transition$.to();
      const toParams = cadetsVm.$transition$.params("to");
      const from = cadetsVm.$transition$.from();
      const fromParams = cadetsVm.$transition$.params("from");
    };
    cadetsVm.$onChanges = function(changesObj) { };
    cadetsVm.$onDestroy = function() { };
  }
})();