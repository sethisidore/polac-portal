(function () {
  angular
    .module('auth')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = [
    '$location',
    'AuthService',
  ];

  /* @ngInject */
  function LogoutController($location, AuthService) {
    const vm = this;
    activate();
    // //////////////

    function activate() {
      return vm.logout;
    }

    vm.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(() => {
          $location.path('/login');
        });
    };
  }
}());
