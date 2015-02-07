'use strict';

angular.module('myApp.controllers').controller('OverviewCtrl', [
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
        NavBarService.updateNavigation('OVERVIEW');
        var observationSuccessApiCall = function(successResponse) {
            $log.info("Response received by MainCtrl.js :: observationSuccessApiCall");
            $scope.observationObject = successResponse;
        }
        var observationFailureApiCall = function(failureResponse) {
            $log.info("Response received by MainCtrl.js :: observationFailureApiCall");
            $scope.observationObject = failureResponse;
        }
        callAPIService.execute('Observation', 'subject=' + $routeParams.patientId, observationSuccessApiCall, observationFailureApiCall);
    }]);
