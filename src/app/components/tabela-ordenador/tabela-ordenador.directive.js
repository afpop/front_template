(function () {
    'use strict';

    angular.module('tabela-ordenador.directive', [])
        .directive('tabelaOrdenador', tabelaOrdenador);

    /** @ngInject */
    function tabelaOrdenador(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                ordenacoes: '=',
                ordenacaoExterna: '=',
                aoGerarOrdenacoes: '=',
                aoProcessarLista: '=',
                spanControladores: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/tabela-ordenador/tabela-ordenador.template.html',
            link: function (scope, element, attrs) {

                scope.obterGridSpan = obterGridSpan;
                scope.obterOrdenacoes = obterOrdenacoes;
                scope.obterOrdenacaoValores = obterOrdenacaoValores;
                scope.ordenarLista = ordenarLista;
                scope.ordenar = ordenar;
                scope.eOrdenacaoExterna = eOrdenacaoExterna;
                scope.obterOrdenacaoExterna = obterOrdenacaoExterna;


                scope.$watchCollection(
                    function () {
                        return obterLista();
                    },
                    function () {
                        if (!eOrdenacaoExterna()) {
                            ordenar(obterOrdenacoes());
                        }
                        else{
                            ordenar([obterOrdenacaoExterna()]);
                        }
                    }
                );

                scope.$watchCollection(
                    function () {
                        return obterOrdenacaoExterna();
                    },
                    function () {
                        if (eOrdenacaoExterna()) {
                            ordenar([obterOrdenacaoExterna()]);
                        }
                    }
                );

                function obterLista() {
                    return scope.lista ? scope.lista : [];
                };

                function obterOrdenacoes() {
                    return scope.ordenacoes ? scope.ordenacoes : [];
                };

                function eOrdenacaoBinaria(ordenacao) {
                    return ordenacao.binaria;
                };

                function obterOrdenacaoValores(ordenacao) {
                    return !eOrdenacaoBinaria(ordenacao) ? ordenacao.valores : [
                        {titulo: 'Crescente'},
                        {titulo: 'Decrescente', decrescente: true},
                    ];
                };

                function ordenar(ordenacoes) {
                    var _propriedades = [];
                    var _ordens = [];
                    if (ordenacoes.length > 0) {
                        angular.element(ordenacoes).each(function (iO, ordenacao) {
                            if (!eOrdenacaoBinaria(ordenacao) && ordenacao.valor) {
                                _propriedades.push(ordenacao.valor.propriedade);
                                _ordens.push((ordenacao.valor.decrescente ? 'desc' : 'asc'));
                            }
                            else if (ordenacao.valor) {
                                _propriedades.push(ordenacao.propriedade);
                                _ordens.push((ordenacao.valor.decrescente ? 'desc' : 'asc'));
                            }
                            else{
                                _propriedades.push(ordenacao.propriedade);
                                _ordens.push((ordenacao.decrescente ? 'desc' : 'asc'));
                            }
                        });
                        scope.aoProcessarLista(ordenarLista(obterLista(), _propriedades, _ordens));
                    }
                    else {
                        scope.aoProcessarLista(obterLista());
                    }
                };

                function ordenarLista(lista, propriedades, ordens) {
                    var _listaOrdenada = lodash.orderBy(lista, propriedades, ordens);
                    return _listaOrdenada
                }

                function obterGridSpan() {
                    var propriedade = 'spanControladores';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };

                function eOrdenacaoExterna() {
                    return scope.ordenacaoExterna ? true : false;
                };

                function obterOrdenacaoExterna() {
                    return scope.ordenacaoExterna;
                };

                function obterDefaults(valor) {
                    var _defaults = {
                        spanControladores: 6
                    };
                    return _defaults[valor];
                };

            }
        }

    }


})
();
