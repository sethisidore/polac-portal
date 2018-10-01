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
        course: '<',
      },
    });

  CourseDetailController.$inject = ['CourseService', '$stateParams'];

  function CourseDetailController(CourseService, $stateParams) {
    const vmcData = this;
    vmcData.courseData = {};
    vmcData.title = '';

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
      console.log(`XHR failed for courses: ${e}`);
    }


    vmcData.$onInit = () => {
      return getCourseById()
        .then(() => {
          console.log(`Activated ${vmcData.title} view`);
        })
        .catch((e) => {
          console.log(`Error activating view: ${e}`);
        });
    };
    vmcData.$onChanges = function (changesObj) { };
    vmcData.$onDestroy = function () { };
  }
}());
