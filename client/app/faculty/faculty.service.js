(function() {
  'use strict';

  angular
    .module('faculty')
    .factory('FacultyService', FacultyService);

  FacultyService.$inject = ['$resource', 'logger', '$q'];
  /* @ngInject */
  function FacultyService($resource, logger, $q) {
    const fac_resource = $resource('/facs/:fac_id/depts/:dept_id', {
      update: {
        method: 'put',
      }
    });

    const service = {
      createFaculty,
      getAllFaculties,
      getFaculty,
      // removeFaculty,
      // updateFaculty,
    };
    
    return service;

    ////////////////
    function getAllFaculties() {
      const faculties = fac_resource.query();
      faculties.$promise.then(getComplete).catch(getFailed);
    }

    function getFaculty(id) {
      const faculty = fac_resource.get(id);
      faculty.$promise.then(getComplete).catch(getFailed);
    }

    function createFaculty() {
      return new fac_resource();
    }

    // Promise Resolving
    function getComplete (data) {
      logger.info('Getting courses resources successful');
      return data;
    }

    function getFailed (err) {
      let errMessage = 'XHR failed for LecturerService: ';
      if (err.data && err.data.description) {
        errMessage += '\n' + err.data.description; 
      }
      err.data.description = errMessage;
      logger.error(errMessage, err);
      return $q.reject(err);
    }
  }
})();