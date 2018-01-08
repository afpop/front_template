(function () {
    'use strict';

    angular
        .module('loading.directive', [])
        .directive('loading', loading);

    /** @ngInject */
    function loading() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/loading/loading.template.html'
        }
    }
})();
