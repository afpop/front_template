(function () {
    'use strict';

    angular
        .module('data.directive', [])
        .directive('data', data);

    /** @ngInject */
    function data() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                rangeMin: '=',
                rangeMax: '=',
                modeloInicio: '=',
                modeloFim: '=',
                modelo: '=',
                range: '=',
                exibirIcone: '=',
                saidaString: '=',
                desativar: '=?'
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/data/data.template.html',
            compile: _compileFunction
        };
        function _compileFunction(tElement, tAttributes) {
            return {
                pre: _preLink,
                post: _postLink
            }

            function _preLink(scope, element, attrs) {

                scope.$watch('modelo', function (newValue, oldValue) {
                    if (newValue) {
                        if (typeof newValue.getMonth === 'function')
                            scope.html5DataInicio = newValue;
                        else
                            scope.html5DataInicio = new Date(newValue);
                    }else{
                        scope.html5DataInicio = '';
                    }
                });

                scope.eRange = _eRange;
                scope.eExibirIcone = _eExibirIcone;
                scope.alterarData = _alterarData;
                scope.obterRangeMin = _obterRangeMin;
                scope.obterRangeMax = _obterRangeMax;
                scope.obterDataFormatada = _obterDataFormatada;

                var _range_inicio = 1;
                var _range_fim = 2;

                _iniciar();

                function _eRange() {
                    return scope.range;
                }
                function _eExibirIcone() {
                    return false;//angular.isUndefined(scope.exibirIcone) ? true : scope.exibirIcone;
                }
                function _eSaidaString() {
                    return scope.saidaString;
                }
                function _obterSaida(data) {
                    if (_eSaidaString()) {
                        return data.toLocaleDateString();
                    } else {
                        return new Date(data);
                    }
                }
                function _obterDataFormatada(data) {
                    return data;
                }
                function _obterRangeMin() {
                    return _obterDataFormatada(scope.rangeMin);
                }
                function _obterRangeMax() {
                    return _obterDataFormatada(scope.rangeMax);
                }
                function _alterarData(data, range) {
                    if (_eRange() && range && range == _range_fim) {
                        scope.modeloFim = data ? _obterSaida(data) : null;
                    }
                    else if (_eRange() && range && range == _range_inicio) {
                        scope.modeloInicio = data ? _obterSaida(data) : null;
                    }
                    else {
                        scope.modelo = data ? _obterSaida(data) : null;
                    }
                }
                function _iniciar() {
                    var _dataInicio = scope.modeloInicio;
                    var _dataFim = scope.modeloFim;
                    if (_eRange()) {
                        if (!scope.modeloInicio) {
                            _dataInicio = ''//scope.rangeMin ? scope.rangeMin : moment().subtract(1, 'week').toDate();
                        }
                        if (!scope.modeloFim) {
                            _dataFim = ''//scope.rangeMax ? scope.rangeMax : moment().add(1, 'week').toDate()
                        }
                    }
                    else {
                        if (!scope.modeloInicio) {
                            _dataInicio = ''//scope.rangeMin ? scope.rangeMin : moment().toDate();
                        }
                        if (!scope.modeloFim) {
                            _dataFim = ''//scope.rangeMax ? scope.rangeMax : moment().toDate();
                        }
                    }
                    scope.html5DataInicio = _dataInicio;
                    scope.html5DataFim = _dataFim;
                    _alterarData(_dataInicio, _range_inicio);
                    _alterarData(_dataFim, _range_fim);
                }

            }
            function _postLink(scope, element, attributes) {

            }
        }
    }
})();

