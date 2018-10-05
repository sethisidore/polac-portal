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
          courses: CoursePrepServiceAll,
        }
      })
      .state('courseDetail', {
        url: '/courses/:course_id',
        component: 'courseDetail',
        resolve: {
          course: CoursePrepServiceOne,
        }
      });

    CoursePrepServiceAll.$inject = ['CourseService'];
    /* @ngInject */
    function CoursePrepServiceAll(CourseService){
      return CourseService.getAllCourses().then((courses) => {
        return courses;
      });
    }

    CoursePrepServiceOne.$inject = ['CourseService', '$transition$'];
    /* @ngInject */
    function CoursePrepServiceOne(CourseService, $transition$) {
      const id = $transition$.params().course_id;
      return CourseService.findCourse({ id }).then((course) => {
        return course;
      });
    }
  }
}());
