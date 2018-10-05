(function initCadetConfig() {
  /*
  * @Config {CadetConfig}
  * 
  */
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
        cadets: CadetPrepServiceAll,
      }
    })
    .state('cadetDetail', {
      url: '/cadet/:cadet_id',
      component: 'cadetDetail',
      resolve: {
        cadet: CadetPrepServiceOne,
      }
    });

    CadetPrepServiceAll.$inject = ['CadetService'];
    /* @ngInject */
    function CadetPrepServiceAll (CadetService){
      return CadetService.getAllCadets().then((cadets) => {
        return cadets;
      });
    }

    CadetPrepServiceOne.$inject = ['CadetService', '$transition$'];
    /* @ngInject */
    function CadetPrepServiceOne (CadetService, $transition$) {
      const id = $transition$.params().cadet_id;
      return CadetService.getCadet({ id }).then((cadet) => {
        return cadet;
      });
    }
  }
})();