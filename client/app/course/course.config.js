(function initCourseConfig() {
  angular.module('course')
    .config(courseConfig);

  courseConfig.$inject = ['$stateProvider'];

  function courseConfig($stateProvider) {
    $stateProvider
      .state('courseList', {
        url: '/courses',
        component: 'courseList',
        resolve: {
          courses: function (CourseService) {
            return CourseService.getAllCourses();
          }
        }
      })
      .state('courseDetail', {
        url: '/courses/:course_id',
        component: 'courseDetail',
        resolve: {
          course: function (CourseService) {
            return CourseService.findCourse($transition$.params().course_id);
          }
        }
      });
  }
}());
