(function initApp() {
  angular
    .module('app', [
      'ui.router',
      'ngResource',
      'core',
      'home',
      'course',
      'dept',
      'faculty',
      'users',
      'blocks',
    ]);
}());
