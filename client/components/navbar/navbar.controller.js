'use strict';

angular.module('epsApp')
  .controller('NavbarCtrl', function ($scope,$rootScope, $location) {
    $rootScope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
