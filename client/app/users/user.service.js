(function() {
  /**
   * @module UserService
   * @memberof Service
   * @returns {[service]}
   */
  angular
    .module('user')
    .factory('UserService', UserService);

  UserService.$inject = ['logger'];
  /* @ngInject */
  function UserService(logger) {
    var service = {
      exposedFn:exposedFn
    };
    
    return service;

    ////////////////
    function exposedFn() { }
  }
})();