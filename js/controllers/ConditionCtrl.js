'use strict';

angular.module('myApp.controllers').controller('ConditionCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$log',
    'NavBarService',
    'callAPIService',
    function ($scope, $rootScope, $routeParams, $log, NavBarService, callAPIService) {

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
   .filter( 'parseConditionDiv', function() {
       return function( input ) {
           return input.replace('<table><tr>','').replace('</tr></table>','');
       }
   });