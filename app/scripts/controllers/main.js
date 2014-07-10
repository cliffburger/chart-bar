'use strict';

angular.module('chartBarApp')
    .controller('MainCtrl', function ($scope) {
        $scope.config = {
            tooltips: true
        };

        $scope.data = {
            data: getChartData()
        };

        var dates = [],
            i;

        for (i = 0; i < 50; i++) {
            dates.push(moment(new Date(2013 + parseInt(i / 12), i % 12, 1)));
        }

        $scope.collection = dates;
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
