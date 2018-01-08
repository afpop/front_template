(function () {
    'use strict';

    angular
        .module('blank', ['blank.controller'])
        .config(blankConfig);

    blankConfig.$injector = ['$stateProvider'];

    /** @ngInject */
    function blankConfig($stateProvider) {

        $stateProvider
            .state('app.blank', {
                url: 'blank',
                views: {
                    '@': {
                        templateUrl: 'app/view/blank/blank.html',
                        controller: 'BlankController',
                        controllerAs: "vm"
                    }
                }
            });

    }

})();
