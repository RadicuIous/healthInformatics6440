/**
 * Created by wr148d on 02/02/2015
 */
'use strict';

angular.module('healthInformatics.fhir.navbar', ['ngResource'])

    .service('NavBarService', [
        '$log',
        '$rootScope',
        '$routeParams',
        function ($log, $rootScope, $routeParams)
        {
            var _updateNavigation = function(path){
                switch(path){
                    case "MAIN":
                        $rootScope.navLinks = [
                            { "description":"Link 1" ,  "link":"#" },
                            { "description":"Link 2" ,  "link":"#"},
                            { "description":"Link 3" ,  "link":"#"}
                        ]
                    break;
                    case "OVERVIEW":
                    case "CONDITION":
                    case "MANAGEMENT":
                    case "GRAPHS":
                    case "DOCTORS":
                        $rootScope.navLinks = [
                            { "description":"Dashboard",  "link":"index.html#/index"},
                            { "description":"Overview",   "link":"index.html#/Overview/"+$routeParams.patientId },
                            { "description":"Condition",    "link":"index.html#/Condition/"+$routeParams.patientId},
                            { "description":"Management", "link":"index.html#/Management/"+$routeParams.patientId},
                            { "description":"Medications","link":"index.html#/Medications/"+$routeParams.patientId},
                            { "description":"Doctors",    "link":"index.html#/Doctors/"+$routeParams.patientId}
                        ]
                    break;
                    default:
                        $rootScope.navLinks = {};

                }
            }
            return{
                updateNavigation : _updateNavigation
            };
        }
    ]);