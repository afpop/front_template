(function () {
    'use strict';

    angular
        .module('sga',
            [
                'interceptor-provider.service',

                'ngAnimate',
                'ngCookies',
                'ngTouch',
                'ngSanitize',
                'ngMessages',
                'ngAria',
                'toastr',
                'LocalStorageModule',
                'base64',
                'ngLodash',
                'angularMoment',
                'ngFileUpload',

                'ui.bootstrap.contextMenu',

                'ui.router',
                'ui.select',

                'config',
                'selectize',

                'login',
                'blank'
            ]);
})();
