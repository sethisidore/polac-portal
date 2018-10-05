(function initCourseService() {
  /*
  * @Service {CourseService}
  * @Child[Constructor] {CourseConstructor}
  * 
  */
  angular
    .module('course')
    .factory('CourseService', CourseService);

  CourseService.$inject = ['$resource', 'logger', '$q'];
  /* @ngInject */
  function CourseService($resource, logger, $q) {
    const basicResourceUrl = $resource('http://localhost:3000/courses/:id/', { id: '@course_id' }, {
      update: {
        method: 'PUT',
      },
    });

    const registerResource = $resource('/course-register/:id', { id: '@register_id' })

    const service = {
      getAllCourses,
      findCourse,
      updateCourse,
      register,
    }

    return service;

    // ///////
    function getAllCourses () {
      const courses = basicResourceUrl.query();
      return courses.$promise.then(getComplete).catch(getFailed);
    }
    
    function findCourse(id) {
      const course = basicResourceUrl.get({ id });
      return course.then(getComplete).catch(getFailed);
    }

    function updateCourse(id) {
    }

    function register () {
      const register = new RegisterConstructor();
    }

    // Promise Resolving
    function getComplete (data) {
      logger.info('Getting courses resources successful');
      return data;
    }

    function getFailed (err) {
      let errMessage = 'XHR failed for CadetService: ';
      if (err.data && err.data.description) {
        errMessage += '\n' + err.data.description; 
      }
      err.data.description = errMessage;
      logger.error(errMessage);
      return $q.reject(err);
    }
  }
}());
