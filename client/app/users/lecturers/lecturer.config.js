(function initLecturerConfig() {
  /*
  * @Config {LecturerConfig}
  * 
  */
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
        lecturers: LecturerPrepServiceAll,
      }
    })
    .state('lecturerDetail', {
      url: '/lecturers/:lecturer_id',
      component: 'lecturerDetail',
      resolve: {
        lecturer: LecturerPrepServiceOne,
      }
    });

    LecturerPrepServiceAll.$inject = ['LecturerService'];
    /* @ngInject */
    function LecturerPrepServiceAll(LecturerService){
      return LecturerService.getAllLecturers().then((lecturers) => {
        return lecturers;
      });
    }

    LecturerPrepServiceOne.$inject = ['LecturerService', '$transition$'];
    /* @ngInject */
    function LecturerPrepServiceOne(LecturerService, $transition$) {
      const id = $transition$.params().lecturer_id;
      return LecturerService.getLecturer({ id }).then((lecturer) => {
        return lecturer;
      });
    }
  }
}());
