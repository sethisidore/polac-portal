(function initAuthConfig() {
  angular.module('auth')
    .config(authConfig);

  authConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  /* @ngInject */
  function authConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/auth/login',
        component: 'login',
      })
      .state('logout', {
        url: '/auth/logout',
        controller: 'logoutController',
        controllerAs: 'logoutCtrl',
      })
      .state('signup', {
        url: '/auth/signup',
        component: 'signup',
      });

    $urlRouterProvider.otherwise('/');
  }
}());
