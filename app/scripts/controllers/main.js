'use strict';

angular.module('chartBarApp')
    .controller('MainCtrl', function ($scope) {
        $scope.config = {
            tooltips: true
        };

        $scope.data = {
            data: getChartData()
        };
    });

function getChartData() {
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push(getData(i));
    }

    return data;
}

function getData(i) {
    var hours = Math.round(Math.random() * 100);
    return {
        x: '2014-' + i,
        y: [hours],
        tooltip: hours + ' hours'
    };
}
