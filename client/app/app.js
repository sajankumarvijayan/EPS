'use strict';

(function(){
  angular.module('epsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'epsApp.common',
    'epsApp.authentication'
  ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
    });


})();
