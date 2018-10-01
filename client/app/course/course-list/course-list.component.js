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

  CourseListController.$inject = ['CourseService'];

  function CourseListController(CourseService) {
    const vmcList = this;
    vmcList.title = 'Course List';

    // //////
    
    vmcList.$onInit = function() {};
    vmcList.$onChanges = function(changesObj) { };
    vmcList.$onDestroy = function() { };
    
  }
}());
