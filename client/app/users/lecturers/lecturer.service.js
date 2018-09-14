(function () {
  angular
    .module('users')
    .factory('LecturerService', LecturerService);

  LecturerService.$inject = ['$resource'];

  function LecturerService($resource) {
    const service = $resource('/lecturers/:lecturerId/', { lecturerId: '@_id' }, {
      update: {
        method: 'PUT',
      },
    },
    {
      stripTrailingSlashes: 'false',
    });
    return service;
  }
}());
