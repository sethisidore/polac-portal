(function () {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('lecturer')
    .component('lecturerDetail', {
      templateUrl: './app/lecturers/lecturer-detail/lecturer-detail.component.js',
      controller: LecturerDetailController,
      controllerAs: 'vmLecturer',
      bindings: {
        lecturer: '<',
      },
    });

  LecturerDetailController.$inject = ['lecturerService'];

  function LecturerDetailController(lecturerService) {
    const vmLecturer = this;
    vmLecturer.title = '';
    

    vmLecturer.$onInit = function () {};
    vmLecturer.$onChanges = function (changesObj) { };
    vmLecturer.$onDestroy = function () { };
  }
}());
