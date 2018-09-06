angular.module('Course')
  .config(['$stateProvider', ($stateProvider) => {
    $stateProvider
      .state('course', {
        url: '/course',
        component: 'courseList',
      });
  }]);
