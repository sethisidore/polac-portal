(function() {
  'use strict';

  angular
    .module('core')
    .factory('SpinnerService', SpinnerService);

  SpinnerService.$inject = [];
  function SpinnerService() {
    const service = {
      transitionStart: start,
      transitionEnd: end,
    };
    
    return service;

    ////////////////
    function start() {
      if (++count > 0) showSpinner();
    }
    
    function end() {
      if(--count < 0) hideSpinner();
    }
  }
})();