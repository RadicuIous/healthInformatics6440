'use strict';

angular.module('myApp.controllers').controller('MedicationsCtrl', [
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
        NavBarService.updateNavigation('MEDICATION');
        var medicationprescriptionSuccessApiCall = function(successResponse) {
            $log.info("Response received by MainCtrl.js :: observationSuccessApiCall");
            $scope.medicationprescriptionObject = successResponse;
            $scope.patientStats = {};

            for (var i = 0; i < $scope.medicationprescriptionObject.entry.length; i++){
                 $scope.patientStats[i] = $scope.medicationprescriptionObject.entry[i];
            }
            if( $scope.medicationprescriptionObject.entry.length == 0 ){
                $scope.patientStats.length = 0;
            }
        }

        var medicationprescriptionFailureApiCall = function(failureResponse) {
            $log.info("Response received by MainCtrl.js :: observationFailureApiCall");
            $scope.medicationprescriptionObject = failureResponse;
        }
        callAPIService.execute('MedicationPrescription', 'subject=' + $routeParams.patientId, medicationprescriptionSuccessApiCall, medicationprescriptionFailureApiCall);
    }]);
