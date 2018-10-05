(function initAuthService() {
  angular
    .module('auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$resource'];

  /* @ngInject */
  function AuthService($resource) {
    let isAuthenticated = false;
    let status = false;

    const service = {
      isLoggedIn,
      getUserStatus,
      login,
      logout,
      signup,
    };

    return service;

    // //////////////
    function isLoggedIn() {
      if (isAuthenticated) {
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

    function getUserStatus() {
      const user = $resource('http://localhost:3000/status');
      if (user.get()) {
        status = true;
      } else {
        status = false;
      }
    }

    function signup() {
      return $resource('http://localhost:3000/signup');
    }

  }
}());
