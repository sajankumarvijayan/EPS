/**
 * Created by sajankumar on 10/10/15.
 */


'use strict';
(function(){
  var app = angular.module('epsApp.common');

  app.factory('ServiceCall',function($http){
    return{
      login:function(userinfo){
        return $http.post('/api/user/login', angular.toJson(userinfo));
      }
    }
  });



})();

