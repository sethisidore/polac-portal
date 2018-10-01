(function initLogin() {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('auth')
    .component('login', {
      templateUrl: './app/core/auth/login/login-form.html',
      controller: 'LoginController',
      controllerAs: 'user',
    });

  LoginController.$inject = ['$location', 'AuthService'];
  
  function LoginController(AuthService) {
    const user = this;
    user.error = false
    user.sumbit = signin;

    user.$onInit = function () {
      user.login = AuthService.login();
    };

    user.$onChanges = function (changesObj) { };
    user.$onDestroy = function () { };

    function signin() {
      user.login.$save().$promise.success(() => {
        $state.go('home');
      })
      .error((err) => {
        user.error = err;
        $state.go('login');
      });
    }

  }
}());
