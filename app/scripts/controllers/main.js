'use strict';

angular.module('chartBarApp')
  .controller('MainCtrl', function ($scope) {
        $scope.config = {
            tooltips: true
        };

        $scope.data = {
            data: [{
                x: "2014-1",
                y: [100],
                tooltip: "100 hours"
            }, {
                x: "2014-2",
                y: [300],
                tooltip: "300 hours"
            }, {
                x: "2014-3",
                y: [351],
                tooltip: "351 hours"
            }, {
                x: "2014-4",
                y: [54],
                tooltip: "54 hours"
            }]
        };
  });
