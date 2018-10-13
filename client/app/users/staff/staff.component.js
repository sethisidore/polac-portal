(function initLecturers() {
  angular
    .module('users')
    .component('lecturers', {
      controller: 'LecturersController',
      controllerAs: 'lecturerVm',
      templateUrl: './app/users/lecturers/lecturers-list/lecturers-list.html',
      bindings: {
        lecturers: '<',
      }
    });

  LecturersController.$inject = ['LecturerService', 'logger'];

  function LecturersController(LecturerService, logger) {
    const lecturerVm = this;
    lecturerVm.lecturerList = [];
    lecturerVm.title = 'Lecturers List';

    lecturerVm.$onInit = () => {}
    lecturerVm.$onChanges = function (changesObj) {};
    lecturerVm.$onDestroy = function () {};
  }
}());
