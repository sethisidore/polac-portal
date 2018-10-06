(function initDeptConfig() {
  /*
  *@module {DeptConfig}
  *@memberOf Config
  *
  */
  angular.module('dept')
    .config(DeptConfig);

  DeptConfig.$inject = ['$stateProvider'];

  function DeptConfig($stateProvider) {
    $stateProvider
      .state('departments', {
        url: '/depts',
        component: 'deptList',
        resolve: {
          departments: DeptPrepServiceAll,
        }
      })
      .state('departments.dept', {
        url: '/{dept_id}',
        component: 'deptDetail',
        resolve: {
          dept: DeptPrepServiceOne,
        }
      })
      .state('createDept', {
        url: '/depts/new',
        component: 'newDept',
      })
      .state('updateDept', {
        url: '/depts/{dept_id}/edit',
        component: 'updateDept',
      })
      .state('deleteDept', {
        url: '/depts/{dept_id}/delete',
      });

    DeptPrepServiceAll.$inject = ['DeptService'];
    /* @ngInject */
    function DeptPrepServiceAll(DeptService){
      return DeptService.getAllDepartments().then((depts) => {
        return depts;
      });
    }

    DeptPrepServiceOne.$inject = ['departments', '$transition$'];
    /* @ngInject */
    function DeptPrepServiceOne(departments, $transition$) {
      const id = $transition$.params().dept_id;
      // using the resolve of the parent state to fetch child data instead of making call to the server
      return departments.find((dept) => {
        return dept.dept_id === id;
      })
    }
  }
}());
