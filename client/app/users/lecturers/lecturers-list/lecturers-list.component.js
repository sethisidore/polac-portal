(function () {
  angular
    .module('lecturer')
    .component('lecturersList', {
      controller: 'LecturersListController',
      controllerAs: 'vmLecturer',
      templateUrl: './app/users/lecturers/lecturers-list/lecturers-list.html',
      bindings: {
        lecturers: '<',
      }
    });

  LecturersListController.$inject = ['LecturerService', 'logger'];

  function LecturersListController(LecturerService, logger) {
    const vmLecturer = this;
    vmLecturer.lecturerList = [];
    vmLecturer.title = 'Lecturers List';

    vmLecturer.$onInit = () => {}
    vmLecturer.$onChanges = function (changesObj) {};
    vmLecturer.$onDestroy = function () {};
  }
}());
