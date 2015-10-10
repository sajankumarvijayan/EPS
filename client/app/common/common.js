/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

(function(){

  var app = angular.module('epsApp.common',[]);
  app.config(function ($stateProvider) {
    $stateProvider
      .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'app/authentication/auth.html'

      })
  });

  app.constant('Common',{
      PASSWORD_ERROR : 'password_error',
  });


})();
