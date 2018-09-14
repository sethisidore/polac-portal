(function () {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('auth')
    .component('signup', {

      templateUrl: './app/core/auth/signup/signup-form.html',
      controller: SignupController,
      controllerAs: 'signCtrl',
      bindings: {
        Binding: '=',
      },
    });

  SignupController.$inject = ['$location', 'AuthService'];
  function SignupController($location, AuthService) {
    const signCtrl = this;
    signCtrl.error = false;
    signCtrl.disabled = true;

    activate();
    function activate() {
      return signCtrl.signup;
    }
    signCtrl.signup = function () {
      // call from service and handle success or error
      AuthService.signup(signCtrl.registerForm.username, signCtrl.registerForm.password)
        .then(() => {
          $location.path('/login');
          signCtrl.disabled = false;
          signCtrl.registerForm = {};
        })
        .catch(() => {
          signCtrl.error = true;
          signCtrl.errorMessage = 'Something went wrong!';
          signCtrl.disabled = false;
          signCtrl.registerForm = {};
        });
    };
  }
}());
