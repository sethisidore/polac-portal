(function initLecturerConfig() {
  angular
    .module('lecturer')
    .config(LecturerConfig);

  LecturerConfig.$inject = ['$stateProvider'];

  function LecturerConfig($stateProvider) {
    $stateProvider
    .state('lecturerList', {
      url: '/lecturers',
      component: 'lecturerList',
      resolve: {
        lecturers: function (LecturerService) {
          return LecturerService.query();
        }
      }
    })
    .state('lecturerDetail', {
      url: '/lecturers/:lecturerId',
      component: 'lecturerDetail',
      resolve: {
        Lecturer: function (LecturerService) {
        return LecturerService.get($transition$.param().id);
        }
      }
    });
  }
}());
