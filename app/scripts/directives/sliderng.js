'use strict';

angular.module('chartBarApp')
    .directive('sliderng', function () {
        return {
            template: '<div class="sliderng"><div class="slider" /><div class="ghost slider" /></div><div class="pin"><div class="label" /></div>',
            restrict: 'EA',
            controller: function ($scope) {
                $scope.pins = [
                    {
                        label: 'Today',
                        data: moment()
                    }
                ];
            },
            link: function(
                $scope,
                $element) {

                var sliderng = $element.find('.sliderng'),
                    slider = sliderng.find('.slider'),
                    minPosition = 0,
                    outerSliderWidth = slider.outerWidth(),
                    timelineWidth = sliderng.width(),
                    maxPosition = timelineWidth - outerSliderWidth,
                    sliding = false,
                    ghostSlider = sliderng.find('.ghost.slider'),
                    timelineLeft = sliderng.position().left,
                    body = sliderng.closest('body'),
                    collectionLength = $scope.collection ? $scope.collection.length : 1,
                    indexFactor = timelineWidth / collectionLength,
                    currentPosition = slider.position().left;

                function locationToMove(e) {
                    var clickPosition = e.clientX - timelineLeft - (outerSliderWidth / 2);
                    return  Math.min(Math.max(clickPosition, minPosition), maxPosition);
                }

                function disableDrag() {
                    sliding = false;
                    ghostSlider.hide();
                }

                function setSlider(location){
                    disableDrag();

                    $scope.$broadcast('slider-position-changed', {
                        data: $scope.collection ? $scope.collection[parseInt(location / indexFactor)] : null,
                        direction: location < currentPosition ? 'left' : 'right'
                    });

                    slider[0].style.left = location + 'px';
                    currentPosition = location;
                }

                function enableDrag() {
                    sliding = true;

                    body.bind('mouseup.slider', function (e) {
                        if (!sliding) {
                            return;
                        }
                        setSlider(locationToMove(e));

                        body.unbind('mousemove.slider mouseup.slider');
                    });

                    body.bind('mousemove.slider', function (e) {
                        if (!sliding) {
                            return;
                        }

                        ghostSlider[0].style.left = locationToMove(e) + 'px';
                        ghostSlider.show();
                    });
                }

                sliderng.bind('mousedown.slider', enableDrag);

                setSlider((timelineWidth / 2) - (outerSliderWidth / 2));
            }
        };
    });