/**
 * Created by sajankumar on 10/10/15.
 */

'use strict';

(function(){

  var app = angular.module('epsApp.authentication',[]);
  app.config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/authentication/users/templates/users.template.html',
        controller:'UsersCtrl'

      })
  });


})();
