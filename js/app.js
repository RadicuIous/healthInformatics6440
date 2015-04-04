'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
	'healthInformatics.fhir.api',
    'healthInformatics.fhir.navbar'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Index', {templateUrl: 'partials/index.html', controller: 'MainCtrl'});
    $routeProvider.when('/Login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/Overview/:patientId', {templateUrl: 'partials/overview.html', controller: 'OverviewCtrl'});
    $routeProvider.when('/Medications/:patientId', {templateUrl: 'partials/medications.html', controller: 'MedicationsCtrl'});
    $routeProvider.when('/History/:patientId', {templateUrl: 'partials/history.html', controller: 'HistoryCtrl'});
    $routeProvider.when('/Management/:patientId', {templateUrl: 'partials/management.html', controller: 'ManagementCtrl'});
    $routeProvider.when('/Doctors/:patientId', {templateUrl: 'partials/doctors.html', controller: 'DoctorsCtrl'});
    $routeProvider.otherwise({redirectTo: '/Index'});
}]);