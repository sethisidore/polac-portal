(function initCadetService() {
  'use strict';

  angular
    .module('cadet')
    .factory('CadetService', CadetService);

  CadetService.$inject = ['$resource'];
  function CadetService($resource) {
    return $resource('/cadets/:id', { id: '@cadet_id' });
  }
})();