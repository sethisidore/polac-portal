(function () {
  /*
  * @Service {LecturerService}
  * 
  */
  angular
    .module('users')
    .factory('LecturerService', LecturerService);

  LecturerService.$inject = ['$resource', 'logger', '$q'];
  /* @ngInject */
  function LecturerService($resource, logger, $q) {
    const resourceUrl = $resource('/lecturers/:lecturer_id/', { lecturerId: '@staff_id' }, {
      update: {
        method: 'PUT',
      },
    }
    );

    const service = {
      getAllLecturers,
      getLecturer,
    }
    return service;

    function getAllLecturers () {
      const lecturers = resourceUrl.query();
      return lecturers.$promise.then(getComplete).catch(getFailed);
    }

    function getLecturer (id) {
      const lecturer = resourceUrl.get({ id });
      return lecturer.$promise.then(getComplete).catch(getFailed);
    }

    function getComplete (data, status, headers, config) {
      logger.info('Activating Lecturer View');
      return data;
    }

    function getFailed (err) {
      let errMessage = 'XHR failed for LecturerService: ';
      if (err.data && err.data.description) {
        errMessage += '\n' + err.data.description; 
      }
      err.data.description = errMessage;
      logger.error(errMessage);
      return $q.reject(err);
    }
  }
}());
