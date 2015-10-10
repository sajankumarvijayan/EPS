/**
 * Created by sajankumar on 10/10/15.
 */


'use strict';
(function(){
  var app = angular.module('epsApp.common');

  app.factory('ServiceCall',function($http, $localStorage){


    return{
      login:function(userinfo){
        return $http.post('/api/user/login', angular.toJson(userinfo));
      },
      saveProfile:function(params){
        $http.defaults.headers.common['x-access-token'] =  $localStorage.profile.token;
        return $http.post('/api/profiles/profile/dummy', angular.toJson(params));
      },
      getProfile:function(id){
        $http.defaults.headers.common['x-access-token'] =  $localStorage.profile.token;

      },
      logout:function(){
        $http.defaults.headers.common['x-access-token'] =  $localStorage.profile.token;
        return $http.get('/api/user/logout');
      }
    }
  });



})();

