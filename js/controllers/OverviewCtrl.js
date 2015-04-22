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
            $scope.uniqueObservations = {};
            $scope.observationHistory = {};
            /*var healthOverview = [
                "Body Height",
                "Body Weight",
                "Diastolic BP",
                "Systolic BP",
                "Heart Beat",
                "Respiration Rate",
                "Total Cholesterol",
                "Body Temperature"];*/

            for (var i = 0; i < $scope.observationObject.entry.length; i++){
                if( !($scope.patientStats.hasOwnProperty($scope.observationObject.entry[i].content.name.coding[0].display))){
                    if($scope.observationObject.entry[i].content.valueQuantity && $scope.observationObject.entry[i].content.valueQuantity.value !== null){
                        $scope.patientStats[$scope.observationObject.entry[i].content.name.coding[0].display] = $scope.observationObject.entry[i];
                    }else{
                        $scope.uniqueObservations[$scope.observationObject.entry[i].content.name.coding[0].display] = $scope.observationObject.entry[i];
                    }
                }else{
                    $scope.observationHistory[$scope.observationObject.entry[i].content.name.coding[0].display] = $scope.observationObject.entry[i];
                }
            }
        }
        var observationFailureApiCall = function(failureResponse) {
            $log.info("Response received by MainCtrl.js :: observationFailureApiCall");
            $scope.observationObject = failureResponse;
        }
        callAPIService.execute('Observation', 'subject=' + $routeParams.patientId, observationSuccessApiCall, observationFailureApiCall);
    }]);
angular.module('myApp.filters', [])
    .filter( 'filterDivs', function() {
        return function( input ) {
            var temp = input.replace('<div>','').replace('</div>','');
            temp = temp.split('=');
            return temp[1];
        }
    })
    .filter( 'removeTime', function() {
        return function( input ) {
            var temp = input.split('T');
            return temp[0];
        }
    })
    .filter('object2Array', function() {
    return function(input) {
        var out = [];
        for(var i in input){
            out.push(input[i]);
        }
        return out;
    }
    })
    .filter('isEmpty', function () {
                var bar;
                return function (obj) {
                    for (bar in obj) {
                        if (obj.hasOwnProperty(bar)) {
                            return false;
                        }
                    }
                    return true;
                };
            });