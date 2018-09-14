(function () {
  angular
    .module('lecturer')
    .component('lecturersList', {
      controller: 'LecturersListController',
      controllerAs: 'vmlList',
      templateUrl: './app/users/lecturers/lecturers-list/lecturers-list.html',
    });

  LecturersListController.$inject = ['LecturerService', 'logger'];

  function LecturersListController(LecturerService, logger) {
    const vmlList = this;
    vmlList.lecturerList = [];
    vmlList.title = 'Lecturers List';

    activate();

    // ////////

    function activate() {
      return getAllLecturers()
        .then(() => {
          logger.info('activated lecturers list view');
        })
        .catch((err) => {
          logger.error(`Problem: ${err}`);
        });
    }

    function getAllLecturers() {
      return LecturerService.query()
        .then(getLecturersComplete)
        .catch(getLecturersFailed);
    }

    function getLecturersComplete(data) {
      vmlList.lecturerList = data;
      logger.info('lecturer list gotten');
    }

    function getLecturersFailed(e) {
      logger.error(`XHR failed for lecturers: ${e}`);
    }
  }
}());
