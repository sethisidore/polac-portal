(function initCourseConfig() {
  angular.module('course')
    .config(courseConfig);

  courseConfig.$inject = ['$stateProvider'];

  function courseConfig($stateProvider) {
    $stateProvider
      .state('course', {
        url: '/course',
        component: 'courseList',
      });
  }
}());
