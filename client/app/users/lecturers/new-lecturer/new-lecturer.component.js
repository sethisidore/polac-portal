(function () {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('lecturer')
    .component('newLecturer', {
      templateUrl: './app/users/lecturers/new-lecturer/new-lecturer.html',
      controller: NewLecturerController,
      controllerAs: 'vmlNew',
      bindings: {
        // Binding: '=',
      },
    });

  NewLecturerController.$inject = ['LecturerService', 'logger'];

  function NewLecturerController(LecturerService, logger) {
    const vmlNew = this;
    vmlNew.lecturer = new LecturerService();
    const payload = {
      username: vmlNew.username,
      fname: vmlNew.fname,
      lname: vmlNew.lname,
    };

    vmlNew.lecturer.$save(payload).then(() => {
      logger.info('Saved new Lecturer');
    });

    // //////////////

    /*
    vmlNew.$onInit = function() { };
    vmlNew.$onChanges = function(changesObj) { };
    vmlNew.$onDestroy = function() { };
    */
  }
}());
