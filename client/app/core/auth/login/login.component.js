(function () {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('auth')
    .component('login', {
      templateUrl: './app/core/auth/login/login-form.html',
      controller: 'LoginController',
      controllerAs: 'logCtrl',
      bindings: {
        // Binding: '=',
      },
    });

  LoginController.$inject = ['$location', 'AuthService'];

  function LoginController($location, AuthService) {
    const logCtrl = this;
    logCtrl.error = false;
    logCtrl.disabled = true;

    activate();

    function activate() {
      return logCtrl.login;
    }

    logCtrl.login = function () {
      // call login from service and handle success or error
      AuthService.login(logCtrl.loginForm.username, logCtrl.loginForm.password)
        .then(() => {
          $location.path('/');
          logCtrl.disabled = false;
          logCtrl.loginForm = {};
        })
        .catch(() => {
          logCtrl.error = true;
          logCtrl.errorMessage = 'Invalid username and/or password';
          logCtrl.disabled = false;
          logCtrl.loginForm = {};
        });
    };
    // //////////////
    /*
    logCtrl.$onInit = function () { };
    logCtrl.$onChanges = function (changesObj) { };
    logCtrl.$onDestroy = function () { };
    */
  }
}());
