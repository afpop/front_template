(function () {
    'use strict';

    angular
        .module('loading.service', [])
        .service('loadingService', loadingService);

    /** @ngInject */
    function loadingService() {

        var _visivel = false;
        var _loadService = {};

        _loadService.exibir = _exibir;
        _loadService.esconder = _esconder;
        _loadService.isVisivel = _isVisivel;

        return _loadService;


        function _exibir() {

            if (_visivel) return;
            _visivel = true;

            var element = angular.element('.loader');

            element.removeClass('esconder');
            element.addClass('mostrar');

        }

        function _esconder() {

            if(!_visivel) return;
            _visivel = false;

            var element = angular.element('.loader');

            element.removeClass('mostrar');
            element.addClass('esconder');

        }

        function _isVisivel(){
            return _visivel;
        }
    }

})();
