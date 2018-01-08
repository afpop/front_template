(function () {
    'use strict';

    angular
        .module('combo.directive', [])
        .directive('combo', combo);

    /** @ngInject */
    function combo($rootScope, lodash, $timeout) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                modelo: '=',
                lista: '=',
                desativar: '=?',
                propriedadesExibicao: '=',
                placeholder: '=?',
                fecharAoSelecionar: '=?',
                multiplo: '=?',
                onChange: '=?',
                carregando: '=?'
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/combo/combo.template.html',
            compile: _compileFunction
        }

        function _compileFunction(tElement, tAttributes) {
            return {
                pre: _preLink,
                post: _postLink
            }

            function _preLink(scope, element, attributes) {

                scope.$watchCollection('modelo', function (novo, antigo) {
                    if (novo) {

                        scope.$evalAsync(_sync);

                        function _sync() {
                            if (scope.multiplo) {
                                var newIds = lodash.map(novo, function (o) {
                                    return parseInt(o[obterPropriedadeExibicaoPrimario().chave]);
                                }).sort();
                                var oldIds = lodash.map(scope.privateModel, function (val) {
                                    return parseInt(val);
                                }).sort();

                                if (lodash.isEqual(newIds, oldIds)) return;

                                scope.privateModel = lodash.map(novo, function (o) {
                                    return o[obterPropriedadeExibicaoPrimario().chave].toString();
                                });

                            } else {
                                scope.privateModel = novo[obterPropriedadeExibicaoPrimario().chave];
                            }
                        }
                    } else {
                        scope.privateModel = null;
                    }
                });

                scope.multiplo = scope.multiplo || false;
                scope.placeholder = scope.placeholder || 'Selecione...';
                scope.fecharAoSelecionar = scope.fecharAoSelecionar || false;
                scope.estaCarregando = _estaCarregando;

                scope.config = {
                    plugins: ['remove_button'],
                    create: false,
                    placeholder: scope.placeholder,
                    valueField: obterPropriedadeExibicaoPrimario().chave,
                    labelField: obterPropriedadeExibicaoPrimario().label,
                    searchField: obterPropriedadeExibicaoPrimario().label,
                    closeAfterSelect: scope.fecharAoSelecionar,
                    maxItems: (scope.multiplo ? null : 1),
                    onChange: bindModelo
                };

                function _estaCarregando() {
                    var _carregando = angular.isFunction(scope.carregando) ? scope.carregando() : scope.carregando || false;
                    return _carregando;
                }

                function obterPropriedadeExibicaoPrimario() {
                    var _propriedadesExibicao = angular.isFunction(scope.propriedadesExibicao) ? scope.propriedadesExibicao() : scope.propriedadesExibicao;
                    _propriedadesExibicao = angular.isArray(_propriedadesExibicao) ? _propriedadesExibicao[0] : _propriedadesExibicao;

                    if (!_propriedadesExibicao) _propriedadesExibicao = {
                        chave: 'id',
                        label: 'valor'
                    };

                    return _propriedadesExibicao;
                }

                function bindModelo(selecionados) {

                    scope.$evalAsync(_sync);

                    function _sync() {

                        if (scope.multiplo) {
                            scope.modelo = lodash.filter(scope.lista, function (o) {
                                return lodash.includes(selecionados, o[obterPropriedadeExibicaoPrimario().chave].toString());
                            });
                        } else {
                            scope.modelo = lodash.find(scope.lista, function (o) {
                                return o[obterPropriedadeExibicaoPrimario().chave] == selecionados;
                            });
                        }

                        if (scope.onChange && angular.isFunction(scope.onChange))
                            scope.onChange(scope.modelo);
                    };

                }
            }

            function _postLink(scope, element, attributes) {

            }
        }
    }
})();

