'use strict';

function getDates(centerDate) {
    var dates = [centerDate],
        i;

    for (i = 1; i <= 20; i++) {
        dates.push(moment(centerDate).subtract('months', i));
        dates.push(moment(centerDate).add('months', i));
    }
    return dates.sort(function (date1, date2) {
        if (date1.valueOf() > date2.valueOf()){
            return 1;
        }
        if (date1.valueOf() < date2.valueOf()) {
            return -1;
        }
        return 0;
    });
}

angular.module('chartBarApp')
    .directive('grid', function () {
        return {
            template: '<div class="container"><div class="row"><div class="data" ng-repeat="date in dates">{{date.format("L")}}</div></div></div>',
            restrict: 'E',
            link: function ($scope, $element) {
                $scope.$on('slider-position-changed', function (e, data) {
                    console.log(data);
                    $scope.dates = getDates(moment(data.data));

                    setTimeout(function () {
                        $element.find('.container').animate({
                            'scrollLeft': ($element.find('.container')[0].scrollWidth / 2)
                        }, 800);
                    });
                });
            }
        };
    });