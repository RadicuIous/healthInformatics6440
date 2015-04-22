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
        $rootScope.prioritizationMethod = "Check-in Time";
        $rootScope.pretendDate = new Date();
        $rootScope.pageIndex = 1;
        
        $scope.prioritizations = [
                                  {name: "First Come First Serve", orderField: "checkinTimeSortable"},
                                  {name: "Patient Complaint", orderField: "complaintPriority"},
                                  {name: "Complaint Severity", orderField: "complaintSeverity"},
                                  {name: "Smart Priority", orderField: "smartSortKey"}
                                  ];
                                  
		
        
        $scope.patientSuccessApiCall = function(successResponse) {
		    $log.info("Response received by MainCtrl.js :: patientSuccessApiCall");
			$scope.patientObject = successResponse;
            if($scope.paginationNumbers === 0){
                $scope.paginationNumbers = parseInt(successResponse.totalResults/50);
                if(successResponse.totalResults % 50 > 0){
                    $scope.paginationNumbers += 1;
                }
            }
            //ADD RANDOMIZED DATA HERE
            
            var patientIndex;
            for (patientIndex = 0; patientIndex < $scope.patientObject.entry.length; patientIndex++)
            {
            	$scope.patientObject.entry[patientIndex].checkinTimeSortable 	= $scope.getRandomInt(0,1440);
            	$scope.patientObject.entry[patientIndex].checkinTime 			= $scope.minutesToTime($scope.patientObject.entry[patientIndex].checkinTimeSortable); 
            	
            	$scope.patientObject.entry[patientIndex].complaintPriority 		= $scope.getRandomInt(0,10);
            	$scope.patientObject.entry[patientIndex].complaint 				= $scope.complaintMapper($scope.patientObject.entry[patientIndex].complaintPriority);
            	$scope.patientObject.entry[patientIndex].complaintSeverity 		= $scope.getRandomInt(1,10);
            	$scope.patientObject.entry[patientIndex].smartSortKey 			= $scope.patientObject.entry[patientIndex].complaintPriority * $scope.patientObject.entry[patientIndex].complaintSeverity;
            }
            
            //remember to sort lowest first. Ascending order on CheckinTime, complaintPriority, and smartSortKey
            
		}
		$scope.patientSortOrder = "checkinTimeSortable";
		
		$scope.setPatientSortOrder = function(order){
			$scope.patientSortOrder = order.orderField;
			$scope.prioritizationMethod = order.name;
		};
		
		$scope.minutesToTime = function(numMinutes){
			var hours = Math.floor(numMinutes / 60);
			var minutes = numMinutes % 60;
			
			return hours + ":" + minutes;
		}
		
		$scope.complaintMapper = function(complaintNumber){
			var complaint;
			switch(complaintNumber){
			case 0: 
				complaint = "TRAUMA/INJURY";
				break;
			case 1:
				complaint = "CHEST PAINS";
				break;
			case 2:
				complaint = "ABDOMINAL PAIN";
				break;
			case 3: 
				complaint = "SERIOUS HEADACHE";
				break;
			case 4:
				complaint = "VOMITING";
				break;
			case 5:
				complaint = "FEVER";
				break;
			case 6: 
				complaint = "BACK PAIN";
				break;
			case 7:
				complaint = "COUGH";
				break;
			case 8:
				complaint = "SORE THROAT";
				break;
			case 9:
				complaint = "TOOTHACHE";
				break;
			case 10: 
				complaint = "SKIN/RASH";
				break;
			}
			return complaint;
		}
		
		$scope.getRandomInt = function(min, max){
			return Math.floor(Math.random()*(max - min + 1)) + min;
		}

        $scope.getNumber = function(num) {
            return new Array(num);
        }

        $scope.getPaginatedData = function(pageNumber) {
        	$rootScope.pageIndex++;
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
            var someDate = new Date();
            var numberOfDaysToAdd = pageNumber;
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
            $rootScope.pretendDate = someDate;
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

        $scope.closeModal = function(){
            $rootScope.showModal = false;
        }
						
	}]);

