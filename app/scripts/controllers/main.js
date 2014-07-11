'use strict';

angular.module('chartBarApp')
    .controller('MainCtrl', function ($scope) {
        $scope.config = {
            tooltips: true
        };

        var dates = [],
            i;

        for (i = 0; i < 50; i++) {
            dates.push(moment(new Date(2013 + parseInt(i / 12), i % 12, 1)));
        }

        $scope.collection = dates;

        $scope.data = {
            data: getChartData(dates)
        };

        $scope.requirements = {
            hours: getChartHours($scope.data.data)
        };

    });

function getChartData(val) {
    var data = [];
    var size = val.length;
    for (var i = 0; i < size; i++) {
        data.push(getData(val[i]));
    }

    return data;
}

function getData(i) {
    // Just to display the y -axis
    var hours = Math.round(Math.random() * 100);
    return {
        x: moment(i).format('L'),
        y: [hours],
        tooltip: hours + ' hours'
    };
}
// get the hours for the chart
function getChartHours(data){
    var hours = [];
    var size = data.length;
    for(var h = 0; h < size; h++)
    {
        hours.push(getHour(data[h]))
    }
    return hours;
}

function getHour(h)
{
    return h.y[0];

}
