angular.module('Home')
  .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: './app/home/home.html',
      controller: 'HomeController as vm',
    })
    .state('about', {
      url: '/about',
      template: '<p>We Will Soon Implement This!!!</p>',
    });
}
