'use strict';

angular.module('myApp.controllers').controller('DoctorsCtrl', ['$scope','$rootScope','NavBarService', function ($scope, $rootScope, NavBarService) {
    $rootScope.showNavBar = true;
    NavBarService.updateNavigation('DOCTORS');
}]);