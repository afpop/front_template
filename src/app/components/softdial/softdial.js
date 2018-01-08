(function () {
    'use strict';

    angular.module('softdial.directive', [])
        .directive('softdial', softDial);

    /** @ngInject */
    function softDial($filter){

        return {
            restrict: 'E',
            replace: true,
            scope:{
                sdModel: "=",
                sdData: "=",
                sdDisabled: "=ngDisabled"
            },
            templateUrl: "app/components/softdial/softdial.html",
            link: function(scope, element, attrs){

                var open = false;

                if(scope.sdModel)
                    scope.sdSelected = $filter('filter')(scope.sdData, { 'value' : scope.sdModel});

                scope.sd_select = function($event, item){

                    scope.sdModel = item.value;

                    var _button =  $(".soft-dial .soft-dial-button .dial-btn-open");

                    var _dial = angular.element(_button).parent().parent();

                    var _dialOptions = _dial.children().first();

                    _toggleElement(_button, _dial, _dialOptions);
                }

                scope.sd_toggle = function($event){

                    var _button = $event.currentTarget;

                    var _dial = angular.element(_button).parent().parent();
                    var _dialOptions = _dial.children().first();

                    _toggleElement(_button, _dial, _dialOptions);
                }

                function _toggleElement(_button, _dial, _dialOptions){

                    var _optionsHeight = -1 * (_dialOptions.height() - 2);

                    _dialOptions.css("margin-top", _optionsHeight);

                    _dial.css("overflow", "visible");

                    if(!open)
                        rotateElement(_button, 360, 300);
                    else
                        rotateElement(_button, -360, 300);

                    $(_button).toggleClass("dial-btn-open");
                    _dialOptions.slideToggle();

                    open = !open;
                }

                function rotateElement(el, deg, duration) {
                    $(el).stop().animate({ rotation: deg }, {
                        duration: duration,
                        step: function(now, fx) {
                            $(this).css({ "transform": "rotate(" + now + "deg)" });
                        }
                    });
                }

                scope.$watch('sdModel', function(){

                    scope.sdSelected = $filter('filter')(scope.sdData, { 'value' : scope.sdModel}, true)[0];
                });

            }
        };

    }

})();


