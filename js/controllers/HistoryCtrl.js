'use strict';

angular.module('myApp.controllers').controller('HistoryCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$log',
    'NavBarService',
    'callAPIService',
    function ($scope, $rootScope, $routeParams, $log, NavBarService, callAPIService) {

        $rootScope.showNavBar = true;
        NavBarService.updateNavigation('HISTORY');

        var encounterSuccessApiCall = function(successResponse) {
            $log.info("Response received by HistoryCtrl.js :: encounterSuccessApiCall");
            $scope.encounterObject = successResponse;
        }
        var encounterFailureApiCall = function(failureResponse) {
            $log.info("Response received by HistoryCtrl.js :: encounterFailureApiCall");
            $scope.encounterObject = failureResponse;
        }

        callAPIService.execute('Encounter', 'subject=' + $routeParams.patientId, encounterSuccessApiCall, encounterFailureApiCall);

}]);