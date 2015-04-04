'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.filters',
    'myApp.controllers',
    'myApp.filters',
	'healthInformatics.fhir.api',
    'healthInformatics.fhir.navbar'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Index', {templateUrl: 'partials/index.html', controller: 'MainCtrl'});
    $routeProvider.when('/Login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/Overview/:patientId', {templateUrl: 'partials/overview.html', controller: 'OverviewCtrl'});
    $routeProvider.when('/Graphs/:patientId', {templateUrl: 'partials/graphs.html', controller: 'GraphCtrl'});
    $routeProvider.when('/Condition/:patientId', {templateUrl: 'partials/condition.html', controller: 'ConditionCtrl'});
    $routeProvider.when('/Management/:patientId', {templateUrl: 'partials/management.html', controller: 'ManagementCtrl'});
    $routeProvider.when('/Doctors/:patientId', {templateUrl: 'partials/doctors.html', controller: 'DoctorsCtrl'});
    $routeProvider.otherwise({redirectTo: '/Index'});
}]);
