'use strict';

angular.module('myApp.controllers').controller('GraphCtrl', ['$scope','$rootScope','NavBarService', function ($scope, $rootScope, NavBarService) {
    $rootScope.showNavBar = true;
    NavBarService.updateNavigation('GRAPHS');
}]);