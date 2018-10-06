(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dept')
    .component('deptList', {
      templateUrl: './app/dept/dept-list/dept-list.html',
      controller: DeptListController,
      controllerAs: 'deptVm',
      bindings: {
        departments: '<',
      },
    });

  DeptListController.$inject = ['logger'];
  /* @ngInject */
  function DeptListController(logger) {
    var deptVm = this;
    

    ////////////////

    deptVm.$onInit = function() {
      logger.info('Activated Departments View');
    };
    deptVm.$onChanges = function(changesObj) { };
    deptVm.$onDestroy = function() { 
      logger.info('Deactivated Departments View');
    };
  }
})();
