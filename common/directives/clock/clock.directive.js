(function(angular) {
    'use strict';

    angular.module('clock.directive', [])
        .directive('tcClock', ['$window',
            function($window) {
                return ({
                    restrict : 'E',
                    scope : {
                        controls : '=',
                        event : '=',
                        eventChange : '&'
                    },
                    templateUrl : '/events/common/directives/clock/clock.html',
                    link : function($scope) {

                        var stripTime = function(date) {
                            return moment(date).format("MM/DD/YYYY");
                        };

                        var getDaysUntil = function(event) {
                            return moment(stripTime(event.date)).diff(moment(stripTime(new Date())), 'days');
                        };

                        $scope.tweet = function() {
                            $window.open('https://twitter.com/intent/tweet?text=' + $scope.event.daysUntil + ' days until ' + $scope.event.name, '_blank');
                        };

                        var init = function() {
                            if(!$scope.event) {
                                $scope.event = {
                                    date : new Date(),
                                    name : 'today!',
                                    daysUntil : 0
                                }
                            }

                            if(!$scope.controls) {
                                $scope.controls = {};
                            }

                            $scope.controls.getDaysUntil = function() {
                                $scope.event.daysUntil = getDaysUntil($scope.event);
                                $scope.eventChange({event : $scope.event});
                                return $scope.event.daysUntil
                            };

                            $scope.controls.getDaysUntil();
                        };

                        init()
                    }
                });
            }
        ]);
}(angular));