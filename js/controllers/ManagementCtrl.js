'use strict';

angular.module('myApp.controllers').controller('ManagementCtrl', [
    '$scope',
    '$routeParams',
    '$rootScope',
    '$window',
    '$location',
    '$log',
    'callAPIService',
    'NavBarService',
    function ($scope, $routeParams, $rootScope, $window, $location, $log, callAPIService, NavBarService) {
        $rootScope.showNavBar = true;
        NavBarService.updateNavigation('MANAGEMENT');
    }]);
