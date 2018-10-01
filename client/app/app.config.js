(function initAppConfig() {
  angular
  .module('app')
  .config(AppConfig)
  .run(RestrictedAndPersistentUsage);

  AppConfig.$inject = ['$locationProvider', '$resourceProvider'];
  /* @ngInject */
  function AppConfig($locationProvider, $resourceProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }

  RestrictedAndPersistentUsage.$inject = [
    'AuthService', '$rootScope', '$state',
  ];

  function RestrictedAndPersistentUsage(AuthService, $state, $rootScope) {
    /*
    $rootScope.$on('$routeChangeStart', (event, next, current) => {
      AuthService.status().then(() => {
        if (next.access.restricted && !AuthService.isLoggedIn()) {
          $state.go('login');
        }
      });
    }); */ 
  }
})();