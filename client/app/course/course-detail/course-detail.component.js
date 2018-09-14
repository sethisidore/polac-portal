(function initCourseDetail() {
  // Usage:
  //
  // Creates: view after getting info for a particular course by its ID

  angular
    .module('course')
    .component('courseDetail', {
      templateUrl: './modules/course/course-detail/course-detail.html',
      controller: CourseDetailController,
      controllerAs: 'vmcData',
      bindings: {
        // Binding: '=',
      },
    });

  CourseDetailController.$inject = ['CourseService', 'logger', '$stateParams'];

  function CourseDetailController(CourseService, logger, $stateParams) {
    const vmcData = this;
    vmcData.courseData = {};
    vmcData.title = '';

    activate();

    // //////

    function activate() {
      return getCourseById()
        .then(() => {
          logger.info(`Activated ${vmcData.title} view`);
        })
        .catch((e) => {
          logger.error(`Error activating view: ${e}`);
        });
    }

    function getCourseById() {
      return CourseService.get({ id: $stateParams.id })
        .then(getCourseComplete)
        .catch(getCourseFailed);
    }

    function getCourseComplete(data) {
      vmcData.courseData = data;
      return vmcData.courseData;
    }

    function getCourseFailed(e) {
      logger.error(`XHR failed for courses: ${e}`);
    }


    /*
    vmcData.$onInit = function () { };
    vmcData.$onChanges = function (changesObj) { };
    vmcData.$onDestroy = function () { };
    */
  }
}());
