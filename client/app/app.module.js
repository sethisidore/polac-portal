(function initApp() {
  angular
    .module('app', ['ui.router',
      'ngResource',
      'core',
      'home',
      'course',
      'users',
      // 'blocks',
    ]);
}());
