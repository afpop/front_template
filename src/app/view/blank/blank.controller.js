(function () {
    'use strict';

    angular
        .module('blank.controller', [])
        .controller('BlankController', BlankController);

    BlankController.$injector = ['$interval', '$timeout'];

    /** @ngInject */
    function BlankController($interval, $timeout) {

        var vm = this;

    }

})();
