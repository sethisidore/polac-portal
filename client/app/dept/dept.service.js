(function initDeptService() {
  /*
  * @module {DeptService}
  * @memberOf Service
  * 
  */
  angular
    .module('dept')
    .factory('DeptService', DeptService);

  DeptService.$inject = ['$resource', 'logger', '$q'];
  /* @ngInject */
  function DeptService($resource, logger, $q) {
    const dept_resource = $resource('/depts/:id/', { id: '@dept_id' }, {
      update: {
        method: 'PUT',
      },
    });

    const service = {
      createDepartment,
      getAllDepartments,
      getDepartment,
      // removeDept,
      // updateDept,
    }

    return service;

    // ///////
    function createDepartment() {
      return new dept_resource();
    }

    function getAllDepartments () {
      const depts = dept_resource.query();
      return depts.$promise.then(getComplete).catch(getFailed);
    }
    
    function getDepartment(id) {
      const dept = dept_resource.get({ id });
      return dept.$promise.then(getComplete).catch(getFailed);
    }

    function updateDept(id) {}

    // Promise Resolving
    function getComplete (data) {
      logger.info('Getting Depts resource successful');
      return data;
    }

    function getFailed (err) {
      let errMessage = 'XHR failed for DeptService: ';
      if (err.data && err.data.description) {
        errMessage += '\n' + err.data.description; 
      }
      err.data.description = errMessage;
      logger.error(errMessage, err);
      return $q.reject(err);
    }
  }
}());
