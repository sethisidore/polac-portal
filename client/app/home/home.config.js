(function initHomeConfig() {
  angular.module('home')
    .config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];

  function homeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './app/home/home.html',
        controller: 'HomeController as vm',
      })
      .state('about', {
        url: '/about',
        template: '<p>We Will Soon Implement This!!!</p>',
      });
  }
}());
