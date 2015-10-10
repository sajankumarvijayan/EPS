'use strict';

(function(){
  angular.module('epsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'epsApp.common'
  ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
    });


})();
