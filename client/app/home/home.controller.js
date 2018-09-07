angular.module('Home')
  .controller('HomeController', HomeController);

HomeController.$inject = [];

function HomeController() {
  const vm = this;
  vm.tagline = 'Hi, Welcome to the Home Page of the Academy';
}
