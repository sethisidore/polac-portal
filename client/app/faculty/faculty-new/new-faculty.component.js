(function initNewFaculty () {
  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('faculty')
    .component('newFaculty', {
      templateUrl: './app/faculty/faculty-form.html',
      controller: NewFacultyController,
      controllerAs: 'facultyVm',
      bindings: {},
    });

  NewFacultyController.$inject = ['FacultyService', 'LecturerService', 'logger'];
  function NewFacultyController(FacultyService, LecturerService, logger) {
    const facultyVm = this;
    facultyVm.lecturers;
    facultyVm.faculty = [];
    facultyVm.action = 'Create';
    facultyVm.submit = submit;

    ////////////////

    facultyVm.$onInit = function() {
      LecturerService.getAllLecturers().then((data) => {
        facultyVm.lecturers = data;
        logger.info('XHR for lecturers successful');
      });

      facultyVm.faculty = FacultyService.createFaculty();
    };
    facultyVm.$onChanges = function(changesObj) { };

    facultyVm.$onDestroy = function() {
      facultyVm.lecturers = [];
      facultyVm.faculty.fac_id = null;
      facultyVm.faculty.name = '';
      facultyVm.faculty.dean = null;
    };

    function submit() {
      facultyVm.faculty.save()
        .$promise.then((msg) => {
          logger.info('Creating New Faculty Successful', msg);
        })
        .catch(err => {
          logger.error('Error: ', err);
        });
    }
  }
})();
