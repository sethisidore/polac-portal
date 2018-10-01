(function() {
  'use strict';

  // Usage:
  // 
  // Creates: the view of a specific Cadet User
  // 

  angular
    .module('cadet')
    .component('cadetDetail', {
      templateUrl: './app/users/cadet/cadet-detail/cadet-detail.html',
      controller: CadetDetailController,
      controllerAs: 'vmCadet',
      bindings: {
        cadet: '<',
      },
    });

  CadetDetailController.$inject = [];
  /* @ngInject */
  function CadetDetailController() {
    var vmCadet = this;
    

    ////////////////

    vmCadet.$onInit = function() { };
    vmCadet.$onChanges = function(changesObj) { };
    vmCadet.$onDestroy = function() { };
  }
})();