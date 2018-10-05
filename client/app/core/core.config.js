(function initCoreConfig() {
  angular
    .module('core')
    .config(toastrConfig, authInterceptorConfig);

    /* @ngInject */
    function toastrConfig (toastr) {
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.options.closeButton = true;
    }

    /* @ngInject */
    function authInterceptorConfig($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptorService')
    }
})();