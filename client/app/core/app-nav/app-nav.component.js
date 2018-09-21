(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('core')
    .component('appNav', {
      templateUrl: './app/core/app-nav/app-nav.html',
      controller: AppNavController,
      controllerAs: 'nav',
    });

  AppNavController.$inject = [];
  function AppNavController() {
    const nav = this;
    

    ////////////////

    nav.$onInit = function() { 
      nav.brand = 'Nigeria Police Academy'
    };
    nav.$onChanges = function(changesObj) { };
    nav.$onDestroy = function() { };
  }
})();