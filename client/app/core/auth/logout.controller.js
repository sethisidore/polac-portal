(function () {
  angular
    .module('auth')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['AuthService','$state','$window'];
  /* @ngInject */
  function LogoutController(AuthService, $state, $window) {
    const vm = this;
    activate();
    // //////////////

    function activate() {
      vm.logout = AuthService.logout();
      logoutUser();
    }

    function logoutUser () {
      return vm.logout.get().$promise.success(() => {
        AuthService.isAuthenticated = false;
        delete $window.sessionStorage.token;
        $state.go('login');
      });
    }
  }

}());
