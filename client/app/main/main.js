'use strict';

(function(){

  angular.module('epsApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        })
    });

})();
