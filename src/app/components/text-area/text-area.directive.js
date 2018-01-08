(function () {
    'use strict';

    angular
        .module('text-area.directive', [])
        .directive('textArea', textArea);

    /** @ngInject */
    function textArea() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                modelo: '=',
                placeholder: '=',
                altura: '@'
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/text-area/text-area.template.html',
            link: function (scope, element, attrs) {

                scope.obterPlaceholder = _obterPlaceholder;
                scope.obterAltura = _obterAltura;
                scope.obterIdEscopo = obterIdEscopo;
                scope.abrirModalExpancao = abrirModalExpancao;

                function obterIdEscopo() {
                    return scope.$id;
                };

                function abrirModalExpancao() {
                    angular.element('#modal-descricao-expancao-' + obterIdEscopo()).modal('show');
                };

                function _obterAltura() {
                    return {
                        'min-height': scope.altura,
                        'height': scope.altura,
                        'max-height': scope.altura,
                        'max-width': '100%',
                        'min-width': '100%',
                        'width': '100%'
                    };
                };

                function _obterPlaceholder() {
                    return scope.placeholder;
                };

            }

        }


    }
})();

