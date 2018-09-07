angular.module('course')
  .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
  $stateProvider
    .state('course', {
      url: '/course',
      component: 'courseList',
    });
}
