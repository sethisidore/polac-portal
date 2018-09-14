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
      controllerAs: 'vmlData',
      bindings: {
        // Binding: '=',
      },
    });

  LecturerDetailController.$inject = ['lecturerService', 'logger', 'stateParams'];

  function LecturerDetailController(lecturerService, logger, stateParams) {
    const vmlData = this;
    vmlData.lecturerData = {};
    vmlData.title = '';

    activate();

    // ////////

    function activate() {
      return getAllLecturers()
        .then(() => {
          logger.info('activated lecturers list view');
        })
        .catch((e) => {
          logger.error(`Problem: ${e}`);
        });
    }

    function getAllLecturers() {
      return lecturerService.get({ id: stateParams.id })
        .then(getLecturerComplete)
        .catch(getLecturerFailed);
    }

    function getLecturerComplete(data) {
      vmlData.lecturerData = data;
      vmlData.title = data.title;

      return vmlData.lecturerData;
    }

    function getLecturerFailed(e) {
      logger.error(`XHR failed for lecturers: ${e}`);
    }


    /*

    vmlData.$onInit = function () { };
    vmlData.$onChanges = function (changesObj) { };
    vmlData.$onDestroy = function () { };
    */
  }
}());
