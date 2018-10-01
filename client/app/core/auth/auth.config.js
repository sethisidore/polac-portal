(function initAuthConfig() {
  angular.module('auth')
    .config(authConfig);

  authConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  /* @ngInject */
  function authConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login',
      })
      .state('logout', {
        url: '/logout',
        controller: 'logoutController',
        controllerAs: 'vm',
      })
      .state('signup', {
        url: '/signup',
        component: 'signup',
      });

    $urlRouterProvider.otherwise('/');
  }
}());
