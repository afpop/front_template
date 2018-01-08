(function () {
    'use strict';

    angular
        .module('lista-texto.directive', [])
        .directive('listaTexto', listaTexto);

    /** @ngInject */
    function listaTexto() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                modelo: '=',
                formato: '=',
                altura: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/lista-texto/lista-texto.template.html',
            link: function (scope, element, attrs) {

                scope.obterPlaceholder = obterPlaceholder;
                scope.adicionarTexto = adicionarTexto;
                scope.obterFormatoTitle = obterFormatoTitle;
                scope.obterFormatoPrefixo = obterFormatoPrefixo;
                scope.obterModeloTexto = obterModeloTexto;
                scope.obterAltura = _obterAltura;
                scope.obterIdEscopo = obterIdEscopo;
                scope.abrirModalExpancao = abrirModalExpancao;

                scope.$watch(
                    function () {
                        return scope.modelo;
                    },
                    function () {
                        if (!scope.modelo) {
                            scope.modelo = [];
                        }
                    }
                );

                function adicionarTexto(texto) {
                    var _valor = texto;
                  //  if (eformato()) {
                    //    _valor = obterFormato();
                    //    _valor[obterFormatoPropriedadeTexto()] = texto;
                   // }
                    scope.modelo.push(_valor);
                }

                function obterPlaceholder() {
                    return scope.placeholder;
                };

                function obterFormato() {
                    return angular.copy(scope.formato.formato);
                };

                function obterFormatoTitle(item) {
                    if (angular.isFunction(scope.formato.title)) {
                        return scope.formato.title(item);
                    }
                    else {
                        return scope.formato.title ? item[scope.formato.title] : item;
                    }
                };

                function obterFormatoPrefixo(item) {
                    if (angular.isFunction(scope.formato.prefixo)) {
                        return scope.formato.prefixo(item);
                    }
                    else {
                        return scope.formato.prefixo ? item[scope.formato.prefixo] : item;
                    }
                };

                function obterFormatoPropriedadeTexto() {
                    return scope.formato.propriedadeTexto;
                };

                function obterModeloTexto(item) {
                    return eformato() ? item[obterFormatoPropriedadeTexto()] : item;
                };

                function obterIdEscopo() {
                    return scope.$id;
                };

                function abrirModalExpancao() {
                    angular.element('#modal-descricao-expancao-' + obterIdEscopo()).modal('show');
                };

                function eformato() {
                    return scope.formato;
                };

                function _obterAltura() {
                    return (angular.isFunction(scope.altura) ? scope.altura() : {'height': scope.altura});
                };

            }
        }

    }


})();

