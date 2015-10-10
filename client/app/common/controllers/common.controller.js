/**
 * Created by sajankumar on 10/10/15.
 */

'use strict';

(function(){

  var app = angular.module('epsApp.common');

  //login controller.
  app.controller('LoginCtrl',function($scope, ServiceCall, $filter, Common){
    $scope.user = {};
    $scope.status = {};
    $scope.status.isShow = false; //default value
    $scope.status.message = "";// default value is gonna be a empty string for now.

    $scope.doAuthentication = function(){
       if($scope.doValidateEmail() && $scope.doValidateInputField()){
            ServiceCall.login($scope.user).success(function(data){
              //proceed to go
              console.log(data);
            }).error(function(err){
              console.log(err);
                $scope.status.isShow = true;
              $scope.status.icon = "danger";
              $scope.status.message = err.authentication;
            });
       }else{
         $scope.status.isShow = true;
         $scope.status.icon = "danger";
         $scope.status.message = "All fields are required!"

       }
    };
    $scope.doValidateEmail = function(){
        return $filter('validateEmail')($scope.user.email);
    };

    $scope.doValidateInputField = function(){
      return $filter('validateInputField')($scope.user.password);
    };

  });

  //forgot password controller.
  app.controller('ForgotCtrl',function($scope,ServiceCall, $filter){
      $scope.status = {};
      $scope.user = {};
      $scope.status.isShow = false; //default value
      $scope.status.message = "";// default value is gonna be a empty string for now.

      $scope.onReset = function(){
         console.log($scope.user.email);
      };

      $scope.doValidate = function(){
        return $filter('validateEmail')($scope.user.email);
      };


  });



})();

