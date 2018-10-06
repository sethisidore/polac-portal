(function initNewDepartment () {
  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dept')
    .component('newDept', {
      templateUrl: './app/dept/dept-form.html',
      controller: NewDeptController,
      controllerAs: 'deptVm',
      bindings: {},
    });

  NewDeptController.$inject = ['DeptService','FacultyService', 'LecturerService', 'logger'];
  /* @ngInject */
  function NewDeptController(DeptService, FacultyService, LecturerService, logger) {
    const deptVm = this;
    deptVm.lecturers;
    deptVm.faculties;
    deptVm.dept = [];
    deptVm.action = 'Create';
    deptVm.submit = submit;

    ////////////////

    deptVm.$onInit = function() {
      LecturerService.getAllLecturers().then((data) => {
        deptVm.lecturers = data;
        logger.info('XHR for lecturers successful');
      });
      FacultyService.getAllFaculties().then((data) => {
        deptVm.faculties = data;
        logger.info('XHR for faculties successful');
      });

      deptVm.dept = DeptService.createdept();
    };
    deptVm.$onChanges = function(changesObj) { };

    deptVm.$onDestroy = function() {
      deptVm.lecturers = [];
      deptVm.faculties = [];
      deptVm.dept.fac_id = null;
      deptVm.dept.name = '';
      deptVm.dept.HOD = null;
    };

    function submit() {
      deptVm.dept.save()
        .$promise.then((msg) => {
          logger.info('Creating New dept Successful', msg);
        })
        .catch(err => {
          logger.error('Error: ', err);
        });
    }
  }
})();
