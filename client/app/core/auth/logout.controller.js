(function () {
  angular
    .module('auth')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = [
    'AuthService',
    '$state'
  ];

  /* @ngInject */
  function LogoutController(AuthService, $state) {
    const vm = this;
    activate();
    // //////////////

    function activate() {
      vm.logout = AuthService.logout();
      logoutUser();
    }

    function logoutUser () {
      return vm.logout.get();
    }
  }

}());
