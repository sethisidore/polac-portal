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
        courses: '<',
      },
    });

  CourseListController.$inject = ['CourseService', 'logger'];
  /* @ngInject */
  function CourseListController(CourseService, logger) {
    const vmcList = this;
    vmcList.title = 'Course List';

    // //////
    
    vmcList.$onInit = function() {
      logger.info('Activated Course View');
    };
    vmcList.$onChanges = function(changesObj) { };
    vmcList.$onDestroy = function() {
      logger.info('Deactivating Course View');
    };
    
  }
}());
