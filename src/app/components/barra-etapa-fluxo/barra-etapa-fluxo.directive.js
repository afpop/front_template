(function () {
    'use strict';

    angular.module('barra-etapa-fluxo.directive', [])
        .directive('barraEtapaFluxo', barraEtapaFluxo);

    barraEtapaFluxo.$injector = ['lodash'];

    /** @ngInject */
    function barraEtapaFluxo(lodash, $timeout) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                etapas: '=',
                etapaAtual: '=',
                etapaSelecionada: '=',
                aoClick: '=',
                atributoExibicao: '=',
                isBloqueado: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/barra-etapa-fluxo/barra-etapa-fluxo.template.html',
            link: function (scope, element, attrs) {

                scope.obterEtapas = _obterEtapas;
                scope.obterAtributoExibicao = _obterAtributoExibicao;
                scope.eventoClick = _eventoClick;
                scope.eAtual = _eAtual;
                scope.eSelecionado = _eSelecionado;
                scope.estaBloqueado = _estaBloqueado;

                scope.tamanhoJanela = $( window ).width();
                scope.exibirSetas = false;

                var _etapas;

                function _estaBloqueado() {
                    var _atributo = 'isBloqueado';
                    if (scope[_atributo]) {
                        return angular.isFunction(scope[_atributo]) ? scope[_atributo]() : scope[_atributo];
                    }
                }

                function _obterEtapas() {

                        if((scope.etapas.length * 170) > scope.tamanhoJanela){

                            scope.exibirSetas = true;
                        }


                    return scope.etapas ? lodash.orderBy(scope.etapas, ['ordem'], ['desc']) : [];
                }

                function _obterAtributoExibicao(item) {
                    return scope.atributoExibicao(item);
                }

                function _eventoClick(item) {
                    if (_estaBloqueado()) return;

                    if (scope.aoClick) {
                        scope.aoClick(item);
                    }
                }

                function _eAtual(item) {
                    if (item && scope.etapaAtual)
                        return item.id == scope.etapaAtual.id;
                    else
                        return false;

                }

                function _eSelecionado(item) {
                    if (!item) return false;
                    if (!scope.etapaSelecionada) return false;
                    return item.id == scope.etapaSelecionada.id;
                }

                var scrollTimer;
                var $document = $("#barra-etapa-fluxo");
                var scrollOffset = 20;

                function scrollContent(scrollDir) {
                    var scrollArgs = {
                        scrollLeft: ($document.scrollLeft() + (scrollOffset * scrollDir))
                    };
                    $("#barra-etapa-fluxo").animate(scrollArgs, 50);
                };

                function scrollLeft() {

                    if ($document.scrollLeft() > 0) {
                        scrollContent(-1);
                    }
                };

                function scrollRight() {

                    scrollContent(1);

                };

                function scrollStop() {
                    clearInterval(scrollTimer);
                };

                $("#scroll-left").on("mousedown", function () {
                    scrollTimer = setInterval(scrollLeft, 60);
                }).on("mouseup", scrollStop);

                $("#scroll-right").on("mousedown", function (){
                    scrollTimer = setInterval(scrollRight, 60);
                }).on("mouseup", scrollStop);

            }
        }

    }

})();
