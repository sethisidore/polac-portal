(function initCadetService() {
  /*
  * @Service {CadetService}
  * 
  */
  angular
    .module('cadet')
    .factory('CadetService', CadetService);

  CadetService.$inject = ['$resource', 'logger', '$q'];
  function CadetService($resource, logger, $q) {
    const resourceUrl = $resource('/cadets/:cadet_id');

    const service = {
      getAllCadets,
      getCadet,
    }
    return service;

    function getAllCadets () {
      return resourceUrl.query()
        .$promise.then(getComplete)
        .catch(getFailed);
    }

    function getCadet (id) {
      return resourceUrl.get({ id })
        .$promise.then(getComplete)
        .catch(getFailed);
    }

    function getComplete (data, status, headers, config) {
      return data;
    }

    function getFailed (err) {
      let errMessage = 'XHR failed for CadetService: ';
      if (err.data && err.data.description) {
        errMessage += '\n' + err.data.description; 
      }
      err.data.description = errMessage;
      logger.error(errMessage,err);
      return $q.reject(err);
    }
  }
})();