(function initAppConfig() {
  angular
  .module('app')
  .config(AppConfig)
  .run(RestrictedAndPersistentUsage, TraceTransitions);

  AppConfig.$inject = ['$locationProvider', '$resourceProvider'];
  /* @ngInject */
  function AppConfig($locationProvider, $resourceProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }

  RestrictedAndPersistentUsage.$inject = ['AuthService', '$transitions'];
  /* @ngInject */
  function RestrictedAndPersistentUsage(AuthService, $transitions) {/*
    $transitions.onBefore({}, (trans) => {
      const auth = trans.injector().get('AuthService');
      if (!auth.isLoggedIn()) {
        return trans.router.stateService.target('login');
    });
    $transitions.onStart((trans) => {
      const spinner = trans.injector().get('SpinnerService');
      spinner.transitionStart();
      trans.promise.finally('spinner.transitionEnd');
    });
    */
  }

  TraceTransitions.$inject = ['$trace'];
  /* @ngInject */
  function TraceTransitions($trace) {
    $trace.enable("TRANSITION", "VIEWCONFIG");
  }
})();

/*
      $state.go('login');
 */