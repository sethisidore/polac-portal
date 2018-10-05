(function() {
  'use strict';

  angular
    .module('core')
    .factory('AuthInterceptorService', AuthInterceptorService);

  AuthInterceptorService.$inject = ['$rootScope', '$q', '$windows', 'toastr'];
  /* @ngInject */
  function AuthInterceptorService($rootScope, $q, $windows, toastr) {
    const service = {
      request,
      responseError,
    };
    
    return service;

    ////////////////
    function request (config) {
      config.headers = config.headers || {};
      if ($windows.sessionStorage.token) {
        config.headers.Authorization = 'Bearer' + $windows.sessionStorage.token;
      }
      return config;
    }

    function responseError(rejection) {
      console.log(rejection);
      const message = rejection.data + ': ' + rejection.config.url;
      toastr.error(message);
      if (rejection.status === 401) {
        //Handle case where user is not authenticated
      }
      return $q.reject(rejection);
    }
  }
})();