'use strict';

angular.module('epsApp')
  .controller('NavbarCtrl', function ($scope, $location, $localStorage) {
    $scope.menu = [];
    if($localStorage.profile){
      if($localStorage.profile.role.toLocaleLowerCase() === "admin_role"){
        $scope.menu.push({title:'Profile', link : '/profile'},{title:'Management', link:'/management'},
          {title:'Setting', link:'/setting'},{title:'Logout', link:'/logout'});
      }else{
        $scope.menu.push({title:'Profile', link : '/profile'},
          {title:'Setting', link:'/setting'},{title:'Logout', link:'/logout'});
      }

    }


    $scope.isCollapsed = false;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
