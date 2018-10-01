(function initSignup() {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('auth')
    .component('signup', {
      templateUrl: './app/core/auth/signup/signup-form.html',
      controller: SignupController,
      controllerAs: 'signup',
      bindings: {},
    });

  SignupController.$inject = ['$location', 'AuthService'];

  /* @ngInject */
  function SignupController($location, AuthService) {
    const vm = this;
    vm.register = formSubmit;



    function roles() {
      return [
        { label: 'cadet', value: 'cadet' },
        { label: 'Lecturer', value: 'lecturer' },
      ];
    }

    function squads() {
      return [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
        { label: 'Five', value: 5 },
        { label: 'Six', value: 6 },
        { label: 'Seven', value: 7 },
        { label: 'Eight', value: 8 },
        { label: 'Nine', value: 9 },
        { label: 'Ten', value: 10 },
        { label: 'Eleven', value: 11 },
        { label: 'Twelve', value: 12 },
      ];
    }

    function formSubmit() {
      return vm.user.$save().$promise.then(() =>{
        console.log('registration Successful')
      })
      .catch(err => {
        console.log(`Registration Error: ${err}`);
      })
    }

    vm.$onInit = () => {
      vm.user = AuthService.signup();
      vm.user.squads = squads;

    }

  }
}());
