(function () {
  angular
    .module('users')
    .factory('LecturerService', LecturerService);

  LecturerService.$inject = ['$resource'];
  /* @ngInject */
  function LecturerService($resource) {
    const service = $resource('/lecturers/:lecturerId/', { lecturerId: '@staff_id' }, {
      update: {
        method: 'PUT',
      },
    }
    );
    return service;
  }
}());
