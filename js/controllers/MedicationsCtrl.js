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
        NavBarService.updateNavigation('OVERVIEW');
        var medicationprescriptionSuccessApiCall = function(successResponse) {
            $log.info("Response received by MainCtrl.js :: observationSuccessApiCall");
            $scope.medicationprescriptionObject = successResponse;
            $scope.patientStats = {};
            $scope.uniqueObservations = {};
            $scope.observationHistory = {};
            var medicationPrescriptions = [
                "MedicationPrescription",
                "Body Weight",
                "Diastolic BP",
                "Systolic BP",
                "Heart Beat",
                "Respiration Rate",
                "Total Cholesterol"];

            for (var i = 0; i < $scope.medicationprescriptionObject.entry.length; i++){
                //if( !($scope.patientStats.hasOwnProperty($scope.medicationprescriptionObject.entry[i].content.medication.display))){
                    //alert($scope.medicationprescriptionObject.entry[i].content.medication.display);
                    //if(medicationPrescriptions.indexOf($scope.medicationprescriptionObject.entry[i].content.medication.display) > -1){
                        $scope.patientStats[i] = $scope.medicationprescriptionObject.entry[i];
                    //}else{
                      //  $scope.patientStats[$scope.medicationprescriptionObject.entry[i].content.medication.display] = $scope.medicationprescriptionObject.entry[i];
                    //}
               // }else{
               //     $scope.observationHistory[$scope.medicationprescriptionObject.entry[i].content.medication.display] = $scope.medicationprescriptionObject.entry[i];
               // }
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
