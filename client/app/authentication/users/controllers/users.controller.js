/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

(function(){

  var app = angular.module('epsApp.authentication');
      app.controller('UsersCtrl',function($scope,$localStorage, $location, $timeout, ServiceCall){

        if(typeof $localStorage.profile === "undefined"){$location.path('/'); return;}
           $scope.username =  $localStorage.profile.name;
        $timeout(function(){
            $scope.menu.push({title:'Profile', link : '/profile'},{title:'Management', link:'/management'},
              {title:'Setting', link:'/setting'},{title:'Logout', link:'/logout'});
          },500);


          //ServiceCall.saveProfile($scope.userObj).success(function(data){
          //    console.log(data);
          //}).error(function(err){
          //   console.log(err);
          //});

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

})();
