'use strict';

angular.module('chartBarApp')
    .directive('timeline', function () {
        return {
            template: '<div class="timeline"><div class="timeline-year" ng-repeat="year in years">{{year.format("YYYY")}}</div></div>',
            restrict: 'E',
            controller: function ($scope) {
                $scope.years = _.uniq($scope.collection, true, function (date) {
                    return date.year();
                });
            },
            link: function ($scope, $element) {
            }
        };
    });