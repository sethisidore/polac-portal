(function initNewCourse() {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('course')
    .component('newCourse', {
      // templateUrl: 'templateUrl',
      controller: NewCourseController,
      controllerAs: 'vmcNew',
      bindings: {
        // Binding: '=',
      },
    });

  NewCourseController.$inject = ['courseService', 'logger'];

  function NewCourseController(courseService, logger) {
    const vmcNew = this;
    vmcNew.title = '';

    activate();

    function activate() {
      return createNewCourse().then(() => {
        logger.info(`Activated create course view: ${vmcNew.data.title}`);
      });
    }

    function createNewCourse() {
      // vmcNew.Course  = new courseService();
    }

    // //////////////
    /*
    vmcNew.$onInit = function () { };
    vmcNew.$onChanges = function (changesObj) { };
    vmcNew.$onDestroy = function () { };
    */
  }
}());
