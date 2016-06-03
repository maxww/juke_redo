'use strict';

var juke = angular.module('juke', ['ui.router', 'ngMessages', 'ui.sortable']);

juke.run(function ($rootScope) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
    });
});

juke.config(function ($urlRouterProvider, $locationProvider) {
    // remove '#' from urls
    $locationProvider.html5Mode(true);
    // invalid routes redirect to the root
    $urlRouterProvider.otherwise('/');
    // reroute home page to albums
    $urlRouterProvider.when('/', '/albums');
    // reroute artist page to artist's ablums page
    $urlRouterProvider.when("/artists/:artistId", "/artists/:artistId/albums");
});
