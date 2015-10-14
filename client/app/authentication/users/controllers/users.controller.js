/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

(function(){

  var app = angular.module('epsApp.authentication');
      app.controller('UsersCtrl',function($scope,$localStorage, $location, $timeout, ServiceCall){

        if(typeof $localStorage.profile === "undefined"){$location.path('/'); return;}
        ServiceCall.getProfile().success(function(data){
          $scope.username =  data.name;
        }).error(function(err){
           console.log(err);
           delete $localStorage.profile;
           $location.path('/');
        });





      });

     app.controller('UsersLogoutCtrl',function($scope,ServiceCall,$localStorage,$location){
       if(typeof $localStorage.profile === "undefined"){$location.path('/'); return;}

       ServiceCall.logout().success(function(data){
           delete  $localStorage.profile;
           $location.path('/');
         }).error(function(err){
           console.log(err)
         });

     });

     app.controller('UsersManagementCtrl',function($scope,ServiceCall,$localStorage,$location){
       if(typeof $localStorage.profile === "undefined"){$location.path('/'); return;}

     });

})();
