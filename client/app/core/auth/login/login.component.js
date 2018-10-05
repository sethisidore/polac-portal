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

  LoginController.$inject = ['$state', 'AuthService', '$window'];
  
  function LoginController(AuthService, $state, $window) {
    const user = this;
    user.error = '';
    user.sumbit = signin;

    user.$onInit = function () {
      user.login = AuthService.login();
    };

    user.$onChanges = function (changesObj) { };
    user.$onDestroy = function () { };

    function signin() {
      user.login.$save().$promise.success((data, status, headers, config) => {
        $window.sessionStorage.token = data.token;
        config.headers = headers;
        config.status = status;
        AuthService.isAuthenticated = true;
        $state.go('home');
      })
      .error((err, data, status, headers, config) => {
        AuthService.isAuthenticated = false;
        user.error = err;
      });
    }
  }
}());
