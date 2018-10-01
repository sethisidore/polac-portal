(function initAuthService() {
  angular
    .module('auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$resource'];

  /* @ngInject */
  function AuthService($resource) {
    let userStatus = null;

    const service = {
      isLoggedIn,
      getUserStatus: status,
      login,
      logout,
      signup,
    };

    return service;

    // //////////////
    function isLoggedIn() {
      if (user) {
        return true;
      }
      return false;
    }

    function login() {
      return $resource('http://localhost:3000/login', { username, password, user });
    }

    function logout() {
      return $resource('http://localhost:3000/logout');
    }

    function status() {
      const user = $resource('http://localhost:3000/status');
      if (user.get()) {
        userStatus = true;
      } else {
        userStatus = false;
      }
    }

    function signup() {
      return $resource('http://localhost:3000/signup');
    }

  }
}());
