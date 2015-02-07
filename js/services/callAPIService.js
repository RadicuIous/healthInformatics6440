/**
 * Created by wr148d on 02/02/2015
 */
'use strict';

angular.module('healthInformatics.fhir.api', ['ngResource'])

    .factory('callAPIService', [
        '$log',
		'$q',
		'$resource',
        function ($log, $q, $resource) 
		{
          var fhirAPIUri = " http://fhirtest.uhn.ca/baseDstu1/";
          var successCallback = function(rawResponse, deferred) 
		  {
			$log.info("Response Received :"+angular.toJson(rawResponse));
             if(1){
                deferred.resolve(rawResponse);
             }else{
                deferred.reject(rawResponse);
             }
           };

            // This method only handles http failures.
            var failureCallback = function(errorResponse) {
                $log.info("Error Response Received :"+angular.toJson(errorResponse));
            };

            var _execute = function(service, params, successCtrl, failureCtrl) {
                var response = undefined;
				var apiUri = '';
				if(params === '' || params === undefined || params === null)
				{
					apiUri = fhirAPIUri + service + '?_format=json';
				}else{
					apiUri = fhirAPIUri + service + '?'+ params + '&_format=json';
				}
                _callAPI(apiUri, successCallback, failureCallback)
                    .then(function(rawResponse) 
					{
                        if(successCtrl) {
                            successCtrl(rawResponse);
                        }
                    },
                    function(rawResponse)
					{
                       if(failureCtrl) 
					   {
                           failureCtrl(rawResponse);
                       }
                    });

                }
		    var _callAPI = function(apiUri, successCallback, failureCallback) {
                var deferred = $q.defer();

                var success = function(rawResponse) {
                    successCallback(rawResponse, deferred);
                };

                var failure = function(errorResponse) {
                    failureCallback();
                    deferred.reject(errorResponse);
                };

                if(angular.isUndefined(angular.isUndefined(apiUri))) {
                    $log.error('callAPI() : Invalid input to method');
                } else {
                        $resource(apiUri, {}, {
                            get : {
                                method : "GET"
                            }
                        }).get(null, success, failure);
                    
                }

                return deferred.promise;
            };
			    return{
                execute : _execute
            };
        }
    ]);