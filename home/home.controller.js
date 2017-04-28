(function (angular) {
    'use strict';

    angular.module('home', []).config(function($routeProvider) {
        $routeProvider.when('/:date/:name', {
            templateUrl : '/events/home/home.html',
            controller  : 'homeCtrl'
        }).when('/:date', {
            templateUrl : '/events/home/home.html',
            controller  : 'homeCtrl'
        }).when('/', {
            templateUrl : '/events/home/home.html',
            controller  : 'homeCtrl'
        });
    }).controller('homeCtrl', ['$scope', '$location', '$routeParams', 'util',
        function($scope, $location, $routeParams, util) {

            if($routeParams.date) {
                $scope.event = {
                    date : util.convertMM_DD_YYYY($routeParams.date),
                    name : $routeParams.name ? $routeParams.name : ''
                }
            } else {
                $scope.event = {
                    date : util.calculateFairDate(),
                    name : 'Fair!'
                }
            }

            $scope.eventChange = function(event) {
                if(event.name) {
                    $location.path('/' + moment(event.date).format('MM-DD-YYYY') + '/' + event.name, false);
                } else {
                    $location.path('/' + moment(event.date).format('MM-DD-YYYY'), false);
                }
            }
        }
    ]);

}(window.angular));