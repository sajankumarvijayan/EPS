/**
 * Created by sajankumar on 10/10/15.
 */

'use strict';

(function(){

  var app = angular.module('epsApp.common');

  //login directive
  app.directive('apsLogin',function($log, Common){
    return{
      restrict:'E',
      templateUrl : '/app/common/templates/login.template.html',
      controller : 'LoginCtrl',
      compile:function($element,$attribute){
         var link = function(scope,elem,attr){
            elem.find('#loginEmail').on('change',function(evt){
              if(typeof scope.user.email === "undefined"){
                elem.find('.login-form .form-group .email .form-control').css('z-index','2');
                return;
              }

              if(scope.doValidateEmail()){

                elem.find('.login-form .form-group .email .form-control').css('z-index','0');
                elem.find('.login-form .email-group').removeClass('has-warning').addClass('has-success');
                elem.find('#toggleEmailIcon').removeClass('glyphicon-warning-sign').addClass('glyphicon-ok');
              }else{
                elem.find('.login-form .form-group .email .form-control').css('z-index','0');
                elem.find('.login-form .email-group').removeClass('has-success').addClass('has-warning');
                elem.find('#toggleEmailIcon').removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
              }

            });


           var errorHandlingInputs = function(){
             if(typeof scope.user.password === "undefined"){
               elem.find('.login-form .form-group .pass .form-control').css('z-index','2');
               return;
             }
             if(scope.doValidateInputField()){
               elem.find('.login-form .form-group .pass .form-control').css('z-index','0');
               elem.find('.login-form .pass-group').removeClass('has-warning').addClass('has-success');
               elem.find('#toogleIcon').removeClass('glyphicon-warning-sign').addClass('glyphicon-ok');
             }else{
               elem.find('.login-form .form-group .pass .form-control').css('z-index','0');
               elem.find('.login-form .pass-group').removeClass('has-success').addClass('has-warning');
               elem.find('#toogleIcon').removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
             }

           };

           scope.$on(Common.PASSWORD_ERROR,function(evt){



           });


         };
        return link;
      }
    }

  });

  //forget password directive
  app.directive('apsLoginforgot',function($log){
    return{
      restrict:'E',
      templateUrl : 'app/common/templates/forgot.template.html',
      controller : 'ForgotCtrl',
      compile:function($element,$attribute){
          var link = function(scope,elem,attr){
              elem.find('#inputGroupSuccess3').on('change',function(evt){
                if(typeof scope.user.email === "undefined"){
                   elem.find('.forgot-password-form .form-group .form-control').css('z-index','2');
                   return;
                }
                   if(scope.doValidate()){
                     elem.find('.forgot-password-form .form-group .form-control').css('z-index','0');
                     elem.find('.forgot-password-form .form-group').removeClass('has-warning').addClass('has-success');
                     elem.find('#toogleIcon').removeClass('glyphicon-warning-sign').addClass('glyphicon-ok');
                   }else{
                     elem.find('.forgot-password-form .form-group .form-control').css('z-index','0');
                     elem.find('.forgot-password-form .form-group').removeClass('has-success').addClass('has-warning');
                     elem.find('#toogleIcon').removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
                   }
              });

          };

        return link;
      }
    }

  });






})();
