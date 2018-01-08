(function () {
    'use strict';

    angular
        .module('login', ['login.controller', 'login.data-service'])
        .config(loginConfig);

    loginConfig.$injector = ['$stateProvider'];

    /** @ngInject */
    function loginConfig($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: 'login',
                views: {
                    '@': {
                        templateUrl: 'app/view/login/login.html',
                        controller: 'LoginController',
                        controllerAs: "vm"
                    }
                }
            });
    }

})();
