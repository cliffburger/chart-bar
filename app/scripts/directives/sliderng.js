'use strict';

angular.module('chartBarApp')
    .directive('sliderng', function () {
        return {
            template: '<div class="timeline"><div class="slider" /><div class="ghost slider" /></div>',
            restrict: 'E',
            link: function(
                $scope,
                $element) {

                var timeline = $element.find('.timeline'),
                    slider = timeline.find('.slider'),
                    minPosition = 0,
                    outerSliderWidth = slider.outerWidth(),
                    timelineWidth = timeline.width(),
                    maxPosition = timelineWidth - outerSliderWidth,
                    sliding = false,
                    ghostSlider = timeline.find('.ghost.slider'),
                    timelineLeft = timeline.position().left,
                    body = timeline.closest('body'),
                    collectionLength = $scope.collection ? $scope.collection.length : 1,
                    indexFactor = timelineWidth / collectionLength;

                function locationToMove(e) {
                    var clickPosition = e.clientX - timelineLeft - (outerSliderWidth / 2);
                    return  Math.min(Math.max(clickPosition, minPosition), maxPosition);
                }

                function disableDrag() {
                    sliding = false;
                    ghostSlider.hide();
                }

                function setSlider(location){
                    var positionLeft = location;

                    disableDrag();

                    $scope.$broadcast('slider-position-changed', {
                        data: $scope.collection ? $scope.collection[parseInt(positionLeft / indexFactor)] : null
                    });

                    slider[0].style.left = positionLeft + 'px';
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

                timeline.bind('mousedown.slider', enableDrag);

                setSlider((timelineWidth / 2) - (outerSliderWidth / 2));
            }
        };
    });