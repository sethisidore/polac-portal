(function initFacultyConfig() {
  angular
    .module('faculty')
    .config(facultyConfig);

  facultyConfig.$inject = ['$stateProvider'];
  /* @ngInject */
  function facultyConfig ($stateProvider) {
    $stateProvider
    .state('faculties', {
      url: '/facs',
      component: 'facultyList',
      resolve: {
        faculties: FacultyPrepServiceAll,
      }
    })
    .state('faculties.faculty', {
      url: '/{fac_id}',
      component: 'facultyDetail',
      resolve: {
        faculty: FacultyPrepServiceOne,
      }
    })
    .state('faculty-new', {
      url: '/facs/create',
      component: 'newFaculty',
    });

    FacultyPrepServiceAll.$inject = ['FacultyService'];
    /* @ngInject */
    function FacultyPrepServiceAll(FacultyService){
      return FacultyService.getAllFaculties().then((faculties) => {
        return faculties;
      });
    }

    FacultyPrepServiceOne.$inject = ['faculties', '$transition$'];
    /* @ngInject */
    function FacultyPrepServiceOne(faculties, $transition$) {
      const id = $transition$.params().fac_id;
      // using the resolve of the parent state to fetch child data instead of making call to the server
      return faculties.find((faculty) => {
        return faculty.fac_id === id;
      });
    }
  }
})();