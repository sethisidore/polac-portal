angular.module('Home')
  .config(['$stateProvider', ($stateProvider) => {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: './modules/home/home.html',
        controller: 'HomeController as vm',
      })
      .state('about', {
        url: '/about',
        template: '<p>We Will Soon Implement This!!!</p>',
      });
  }]);
