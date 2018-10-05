(function initLogger() {
  'use strict';

  angular
    .module('blocks')
    .factory('logger', logger);

  logger.$inject = ['$log', 'toastr'];
  /* @ngInject */
  function logger($log, toastr) {
    const service = {
      error,
      info,
      success,
      warning,

      log: $log.log, // straight to console, bypass toastr.
    };
    
    return service;

    ////////////////
    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warning('Warning: ' + message, data);
    }
  }
})();