'use strict';

angular.module('myApp.controllers', [])
    .controller('MainCtrl', [
	'$scope', 
	'$rootScope', 
	'$window', 
	'$location',
	'$log',
	'callAPIService',
    'NavBarService',
	function ($scope, $rootScope, $window, $location, $log, callAPIService, NavBarService) {
        $rootScope.showNavBar = true;
        NavBarService.updateNavigation('MAIN');
		var responseObject = null;
		$scope.patientObject  = null;

		var patientSuccessApiCall = function(successResponse) {
		    $log.info("Response received by MainCtrl.js :: patientSuccessApiCall");
			$scope.patientObject = successResponse;
		}
		var patientFailureApiCall = function(failureResponse) {
			$log.info("Response received by MainCtrl.js :: patientFailureApiCall");
			$scope.patientObject = failureResponse;
		}
        $scope.patientClick = function(idLink){
            var urlArray = idLink.split('/');
            var patientId = urlArray[urlArray.length-2]+'|'+urlArray[urlArray.length-1];
            $location.path('Overview/' + patientId);
        }

		

		callAPIService.execute('Patient', null, patientSuccessApiCall, patientFailureApiCall);
		/*
		callAPIService.execute('Observation', null, successfulApiCall, failureApiCall);
		callAPIService.execute('DiagnosticReport', null, successfulApiCall, failureApiCall);
		callAPIService.execute('DeviceObservationReport', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Location', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Organization', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Condition', null, successfulApiCall, failureApiCall);
		callAPIService.execute('MedicationStatement', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Encounter', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Immunization', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Practitioner', null, successfulApiCall, failureApiCall);
		callAPIService.execute('AdverseReaction', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Appointment', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Device', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Media', null, successfulApiCall, failureApiCall);
		callAPIService.execute('Procedure', null, successfulApiCall, failureApiCall);
		*/
						
	}]);

