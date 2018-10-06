(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dept')
    .component('deptDetail', {
      templateUrl: './app/dept/dept-detail/dept-detail.html',
      controller: DeptDetailController,
      controllerAs: 'deptVm',
      bindings: {
        dept: '<',
      },
    });

  DeptDetailController.$inject = ['logger'];
  /* @ngInject */
  function DeptDetailController(logger) {
    const deptVm = this;
    

    ////////////////

    deptVm.$onInit = function() {
      logger.info('Activated Department Detail View');
    };
    deptVm.$onChanges = function(changesObj) { };
    deptVm.$onDestroy = function() {
      logger.info('Deactivated Department Detail View');
    };
  }
})();