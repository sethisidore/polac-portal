(function initCourseService() {
  angular
    .module('course')
    .factory('CourseService', CourseService);

  CourseService.$inject = ['$resource'];

  function CourseService($resource) {
    const service = $resource('/course/:course_id/', { course_id: '@_id' }, {
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
