(function initCadetConfig() {
  angular
    .module('cadet')
    .config(CadetConfig);

  CadetConfig.$inject = ['$stateProvider'];
  /* @ngInject */
  function CadetConfig($stateProvider) {
    $stateProvider
    .state('cadetList', {
      url: '/cadets',
      component: 'cadetList',
      resolve: {
        cadets: function (CadetService) {
          return CadetService.query();
        }
      }
    })
    .state('cadetDetail', {
      url: '/cadet/:id',
      component: 'cadetDetail',
      resolve: {
        cadet: function (CadetService) {
        return CadetService.get($transition$.param().id);
        }
      }
    });
  }
})();