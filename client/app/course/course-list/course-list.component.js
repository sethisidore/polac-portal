(function initCourseList() {
  // Usage:
  //
  // Creates:

  angular
    .module('course')
    .component('courseList', {
      templateUrl: './app/course/course-list/course-list.html',
      controller: CourseListController,
      controllerAs: 'vmcList',
      bindings: {
        // Binding: '=',
      },
    });

  CourseListController.$inject = ['CourseService', 'logger'];

  function CourseListController(CourseService, logger) {
    const vmcList = this;
    vmcList.courses = [];
    vmcList.title = 'Course List';

    activate();

    function activate() {
      return getAllCourses().then(() => {
        logger.info('Activated course view');
      });
    }

    function getAllCourses() {
      return CourseService.query({ isArray: 'true' })
        .then(getCoursesComplete)
        .catch(getCoursesFailed);
    }

    function getCoursesComplete(data) {
      vmcList.courses = data;
      return vmcList.courses;
    }

    function getCoursesFailed(e) {
      logger.error(`XHR failed for courses: ${e}`);
    }

    /*
    vmcList.$onInit = function() { };
    vmcList.$onChanges = function(changesObj) { };
    vmcList.$onDestroy = function() { };
    */
  }
}());
