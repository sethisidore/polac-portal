(function initCourseService() {
  angular
    .module('course')
    .factory('CourseService', CourseService);

  CourseService.$inject = ['$resource'];

  function CourseService($resource) {
    const service = {
      getAllCourse,
      findCourse,
      updateCourse,
      register,
    }

    return service;

    // ///////
    function getAllCourse () {
      const courses = new CourseConstructor();
      return courses.query();
    }
    
    function findCourse(id) {
      const course = new CourseConstructor();
      return course.get({ id });
    }

    function updateCourse(id) {
    }

    function register () {
      const register = new RegisterConstructor();
    }

    // Constructs the Resource for use by getAllCourse, findCourse, CreateCourse, updateCourse and deleteCourse
    function CourseConstructor () {
      return $resource('http://localhost:3000/courses/:id/', { id: '@course_id' }, {
        update: {
          method: 'PUT',
        },
      });
    }

    function RegisterConstructor () {
      return $resource('/register-courses');
    }
    
  }
}());
