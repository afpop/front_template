(function () {
    'use strict';

    angular
        .module('login.controller', [])
        .controller('LoginController', LoginController);


    LoginController.$injector = ['$state'];

    /** @ngInject */
    function LoginController($state) {

        var vm = this;

        vm.login = _login;

        function _login() {

            $state.go('app.blank');
        }

    }

})();
