(function initUserConfig () {
  'use strict';

  angular
    .module('user')
    .config(userConfig);

  userConfig.$inject = ['$stateProvider'];
  /**
   * @method userConfig
   * @memberof [module] user
   * @param {state} $stateProvider
   * @ngInject 
   */
  function userConfig($stateProvider) {
    $stateProvider
      .state('user.cadet', {
        url: '/user/cadet',
        component: '',
        resolve: CadetPrepService,
      })
      .state('user.staff', {
        url: '/user/staff',
        component: '',
        resolve: StaffPrepService,
      })
      .state('user.person', {
        url: '/user/:user_id/profile',
        component: '',
        resolve: UserPrepService,
      });

    CadetPrepService.$inject = ['UserService'];
    /**
     * @method CadetPrepService
     * @memberof userConfig
     * @param {*} UserService
     * @returns {cadets}
     * @ngInject  
     */
    function CadetPrepService(UserService) {
      return UserService.fetchAllCadets()
        .then((cadets) => {
          return cadets;
        });
    }

    StaffPrepService.$inject = ['UserService'];
    /**
     * @method StaffPrepService
     * @memberof userConfig
     * @param {*} UserService
     * @returns {staffs}
     * @ngInject  
     */
    function StaffPrepService(UserService) {
      return UserService.fetchAllStaffs()
        .then((staffs) => {
          return staffs;
        });
    }

    UserPrepService.$inject = ['UserService'];
    /**
     * @method UserPrepService
     * @memberof userConfig
     * @param {*} UserService 
     * @param {*} $transition$ 
     * @ngInject
     */
    function UserPrepService(UserService, $transition$) {
      const username = $transition$.params().username;
      return UserService.fetchUser(username)
        .then((user) => {
          return user;
        });
    }
  }
})();