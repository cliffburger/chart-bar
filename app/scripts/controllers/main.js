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

        $scope.requirements = {
            hours : getChartRequirements(dates)
        };

        $scope.requirementsTwo= {
            hours:getChartRequirements(dates)
        };

        $scope.requirementsThree= {
            hours:getChartRequirements(dates)
        };

        $scope.data = {
            data: getChartData(dates, $scope.requirements, $scope.requirementsTwo,$scope.requirementsThree )
        };
    });


function getChartData(val, req1, req2, req3) {
    var data = [];
    var size = val.length;
    for (var i = 0; i < size; i++) {
        data.push(getData(val[i], req1.hours[i],req2.hours[i], req3.hours[i]));
    }

    return data;
}


function getData(i , r1, r2, r3) {
    var data =[];

    if(r1 < r2 && r1 < r3){
        if(r2 < r3){
            data =[r1,r2,r3];
        }
        else {
            data =[r1,r3,r2];
        }
    } else if(r2<r1 && r2<r3 ) {
        if(r1 < r3) {
            data = [r2, r1, r3];
        }else{
            data =[r2,r3,r1];
        }
    }else{
        if(r2<r1){
            data =[r3,r2,r1];
        }else{
            data =[r3,r1,r2];
        }
    }

    return {
        x: moment(i).format('L'),
        y: data
        //tooltip: hours + ' hours'
    };
}

function getChartRequirements(data){
    var size = data.length, hours = [];
    for(var i=0; i< size-9;i++){
       var h=  Math.round(Math.random()*100);
       hours.push(h);
    }
 return hours;
}
