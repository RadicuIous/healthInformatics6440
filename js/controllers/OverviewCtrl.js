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
            $scope.patientStats = {};
            for (var i = 0; i < $scope.observationObject.entry.length; i++){
                if( !($scope.patientStats.hasOwnProperty($scope.observationObject.entry[i].content.name.coding[0].display))){
                    $scope.patientStats[$scope.observationObject.entry[i].content.name.coding[0].display] = $scope.observationObject.entry[i];
                }
            }
        }
        var observationFailureApiCall = function(failureResponse) {
            $log.info("Response received by MainCtrl.js :: observationFailureApiCall");
            $scope.observationObject = failureResponse;
        }
        callAPIService.execute('Observation', 'subject=' + $routeParams.patientId, observationSuccessApiCall, observationFailureApiCall);
    }]);
