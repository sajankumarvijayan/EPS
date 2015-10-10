/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

(function(){

  var app = angular.module('epsApp.common');

  app.filter('validateEmail',function(){
      return function(input){
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(input);
      }
  });
  app.filter('validateInputField',function(){
        return function(input){
          if(typeof input !== "undefined" && input.length > 0){
              return true;
          }else{
              return false;
          }
        }
  });

})();
