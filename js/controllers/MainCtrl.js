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
        $scope.paginationNumbers = 0;
        $scope.selectedIndex = 0;
        $scope.prioritizationMethod = "Check-in Time";
        $scope.pretendDate = new Date();
        
        
        

		$scope.patientSuccessApiCall = function(successResponse) {
		    $log.info("Response received by MainCtrl.js :: patientSuccessApiCall");
			$scope.patientObject = successResponse;
            if($scope.paginationNumbers === 0){
                $scope.paginationNumbers = parseInt(successResponse.totalResults/50);
                if(successResponse.totalResults % 50 > 0){
                    $scope.paginationNumbers += 1;
                }
            }
		}

        $scope.getNumber = function(num) {
            return new Array(num);
        }

        $scope.getPaginatedData = function(pageNumber) {
            $scope.selectedIndex = pageNumber;
            $scope.offset = pageNumber * 50;
            var apiSplit = $scope.patientObject.link[1].href.split('&');
            var apiUri = apiSplit[0];
            for (var i = 1; i < apiSplit.length; i++){
                if(apiSplit[i].indexOf('getpagesoffset') === -1){
                    apiUri += '&'+ apiSplit[i];
                }
            }
            apiUri += '&_getpagesoffset=' + $scope.offset;
            $log.error('apiURI: '+apiUri);

            callAPIService.execute(null, null, $scope.patientSuccessApiCall, $scope.patientFailureApiCall, apiUri);
        }

		$scope.patientFailureApiCall = function(failureResponse) {
			$log.info("Response received by MainCtrl.js :: patientFailureApiCall");
			$scope.patientObject = failureResponse;
		}
        $scope.patientClick = function(idLink, firstName, lastName){
            $rootScope.firstName = firstName;
            $rootScope.lastName = lastName;

            var urlArray = idLink.split('/');
            var patientId = urlArray[urlArray.length-2]+'|'+urlArray[urlArray.length-1];
            $location.path('Overview/' + patientId);
        }

		

		callAPIService.execute('Patient', null, $scope.patientSuccessApiCall, $scope.patientFailureApiCall);
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

