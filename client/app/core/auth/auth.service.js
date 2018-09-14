(function initAuthService() {
  angular
    .module('auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', '$q',
    // 'LecturerService', 'StudentService'
  ];

  /* @ngInject */
  function AuthService($http, $q) {
    let user = null;

    const service = {
      isLoggedIn,
      getUserStatus,
      login,
      logout,
      // signup,
    };

    return service;

    // //////////////
    function isLoggedIn() {
      if (user) {
        return true;
      }
      return false;
    }

    function getUserStatus() {
      // send a request to server and handle success or error
      return $http.get('/user/status')
        .success((data) => {
          if (data.status) {
            user = true;
          } else {
            user = false;
          }
        })
        .error(() => {
          user = false;
        });
    }

    function login(username, password) {
      // create a new instance of deferred
      const deferred = $q.defer();

      // send a post request to the server and handle success or error
      $http.post('/auth/login', { user_id: username, passCode: password })
        .success((data, status) => {
          if (status === 200 && data.status) {
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        .error(() => {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function logout() {
    // create a new instance of deferred
      const deferred = $q.defer();

      // send a get request to the server
      $http.get('/auth/logout').success(() => {
        user = false;
        deferred.resolve();
      })
        .error(() => {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }
    /*
    function signup(username, password) {
      const deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        { username, password })
      // handle success
        .success((data, status) => {
          if (status === 200 && data.status) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
      // handle error
        .error(() => {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    } */
  }
}());
