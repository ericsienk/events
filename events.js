(function (angular) {
    'use strict';

    var appDep = [
        'ngRoute',
        'home',
        'util.service',
        'clock.directive'
    ];

    var events = angular.module('events', appDep);

    events.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : '/events/home/home.html',
            controller  : 'homeCtrl'
        }).otherwise({ redirectTo: '/' });
    });

    events.controller('eventsCtrl', ['$scope', '$rootScope', '$route', '$location',
        function($scope, $rootScope, $route, $location) {

            var original = $location.path;
            $location.path = function(path, reload) {
                if(reload === false) {
                    var lastRoute = $route.current;
                    var un = $rootScope.$on('$locationChangeSuccess', function() {
                        $route.current = lastRoute;
                        un();
                    })
                }
                return original.apply($location, [path]);
            };
        }
    ]);

}(window.angular));