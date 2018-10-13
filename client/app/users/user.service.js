(function() {
  /**
   * @module UserService
   * @memberof Service
   * @returns {[service]}
   */
  angular
    .module('user')
    .factory('UserService', UserService);

  UserService.$inject = ['$resource','logger'];
  /**
   * @method UserService
   * @memberof [module] user
   * @param {*} $resource 
   * @param {*} logger 
   */
  function UserService($resource, $q, logger) {
    const resource = $resource('/user/:user_id', { user_id: '@username'}, {
      update: {
        method: 'PUT',
      }
    });
    const type = 'cadet' || 'staff';
    const subResource = $resource('/user/{type}');

    const service = {
      fetchAllCadets,
      fetchAllStaffs,
      fetchUser,
    };
    
    return service;

    ////////////////
    function fetchAllCadets() {
      type = 'cadet';
      return resource.query()
        .$promise.then(getComplete)
        .catch(getFailed);
    }

    function fetchAllStaffs() {
      type = 'staff';
      return resource.query()
        .$promise.then(getComplete)
        .catch(getFailed);
    }

    function fetchUser(username) {
      return subResource.get(username)
        .$promise.then(getComplete)
        .catch(getFailed);
    }

    function getComplete (data) {
      return data;
    }

    function getFailed (err) {
      let reason = 'XHR failed for CadetService: ';
      if (err && err.message) {
        reason += '\n' + err.message; 
      }
      logger.error(reason);
      return $q.reject(err);
    }
  }
})();