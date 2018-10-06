(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('faculty')
    .component('facultyList', {
      templateUrl: './app/faculty/faculty-list/faculty-list.html',
      controller: FacultyListController,
      controllerAs: 'facultyVm',
      bindings: {
        faculties: '<',
      },
    });

  FacultyListController.$inject = ['logger'];
  function FacultyListController(logger) {
    var facultyVm = this;
    

    ////////////////

    facultyVm.$onInit = function() {
      logger.info('Activating Faculty-List View');
    };
    facultyVm.$onChanges = function(changesObj) { };
    facultyVm.$onDestroy = function() {
      logger.info('Deactivated Faculty-List View');
    };
  }
})();