'use strict';

angular.module('myApp.controllers').controller('ConditionCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$log',
    '$sce',
    'NavBarService',
    'callAPIService',
    function ($scope, $rootScope, $routeParams, $log, $sce, NavBarService, callAPIService) {

        $rootScope.showNavBar = true;
        NavBarService.updateNavigation('CONDITION');

        var conditionSuccessApiCall = function(successResponse) {
            $log.info("Response received by ConditionCtrl.js :: conditionSuccessApiCall");
            $scope.conditionObject = successResponse;
        }
        var conditionFailureApiCall = function(failureResponse) {
            $log.info("Response received by ConditionCtrl.js :: conditionFailureApiCall");
            $scope.conditionObject = failureResponse;
        }

        callAPIService.execute('Condition', 
        					   'subject=' + $routeParams.patientId, 
        					   conditionSuccessApiCall, 
        					   conditionFailureApiCall);
}]);

angular.module('myApp.filters')
   .filter( 'parseConditionSystem', function() {
       return function( input ) {
	 		if(input.search('snomed') != -1) {
	 			return input.match('snomed')[0].toUpperCase();
	 		}
	 		if(input.search('icd-9') != -1) {
	 			return input.match('icd-9')[0].toUpperCase();
	 		}
	 		return input;
       }
   });