(function () {
    'use strict';

    angular.module('tabela-filtro.directive', [])
        .directive('tabelaFiltro', tabelaFiltro);

    /** @ngInject */
    function tabelaFiltro(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                atributosFiltroString: '=',
                aoProcessarLista: '=',
                spanControladores: '=',
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/tabela-filtro/tabela-filtro.template.html',
            link: function (scope, element, attrs) {

                var _atributoExibicao = [null];

                var _valoresFiltro = [];

                scope.obterGridSpan = obterGridSpan;
                scope.processarListaTexto = processarListaTexto;
                scope.processarListaFiltros = processarListaFiltros;


                scope.obterAtributoExibicao = obterAtributoExibicao;

                function eListaDeString(lista) {
                    return angular.isString(lista[0]);
                };

                function obterLista() {
                    return scope.lista ? scope.lista : [];
                };
                function obterGridSpan() {
                    var propriedade = 'spanControladores';
                    return angular.isUndefined(scope[propriedade]) ? obterDefaults(propriedade) : scope[propriedade];
                };
                function obterDefaults(valor) {
                    var _defaults = {
                        spanControladores: 6
                    };
                    return _defaults[valor];
                };
                function obterAtributosFiltroString() {
                    return scope.atributosFiltroString ? scope.atributosFiltroString : [];
                };
                function obterTextoFiltro() {
                    return scope.textoFiltro;
                };

                function obterAtributoExibicao() {
                    return _atributoExibicao;
                };

                function processarListaTexto(valorFiltroString) {
                    if (valorFiltroString) {
                        if (eListaDeString(obterLista())) {
                            scope.aoProcessarLista(filtrarListaString(obterLista(), valorFiltroString));
                        }
                        else {
                            scope.aoProcessarLista(filtrarListaObjeto(obterLista(), valorFiltroString, obterAtributosFiltroString()));
                        }
                    }
                    else {
                        scope.aoProcessarLista(obterLista());
                    }
                };

                function processarListaFiltros() {
                    scope.aoProcessarLista(filtrarListaPorFiltros(obterLista(), obterFiltros()));
                };

                function filtrarListaString(vetor, valor) {
                    return lodash.filter(vetor, function (item) {
                        return item && item.toString().toLowerCase().indexOf(valor.toString().toLowerCase()) > -1;
                    });
                };
                function filtrarListaObjeto(vetor, valor, filtros) {
                    var retorno = [];
                    filtros = filtros.length > 0 ? filtros : Object.keys(vetor[0]);
                    angular.element(filtros).each(function (iF, filtro) {
                        var _filtrados = lodash.filter(vetor, function (item) {
                            var _valorPropriedade = angular.isFunction(filtro) ? filtro(item) : item[filtro];
                            return _valorPropriedade && _valorPropriedade.toString().toLowerCase().indexOf(valor.toString().toLowerCase()) > -1;
                        });
                        Array.prototype.push.apply(retorno, _filtrados);
                    });
                    return removerDuplicatas(retorno);
                };
                function filtrarListaPorFiltros(vetor, filtros) {
                    var _vetor = vetor;
                    if (filtros && filtros.length > 0) {
                        angular.element(filtros).each(function (iF, filtro) {
                            /*var _filtrados*/
                            _vetor = lodash.filter(_vetor, function (item) {
                                var _valorPropriedade = angular.isFunction(filtro.propriedade) ? filtro.propriedade(item) : item[filtro.propriedade];
                                if (angular.isArray(_valorPropriedade)) {
                                    if (!filtro.valor || angular.isArray(filtro.valor) && filtro.valor.length == 0) {
                                        return true;
                                    }
                                    else if (angular.isArray(filtro.valor)) {
                                        return lodash.intersection(filtro.valor, _valorPropriedade) > 0;
                                    }
                                    else {
                                        return _valorPropriedade.indexOf(filtro.valor) > -1;
                                    }
                                }
                                else {
                                    if (!filtro.valor || angular.isArray(filtro.valor) && filtro.valor.length == 0) {
                                        return true;
                                    }
                                    else if (angular.isArray(filtro.valor)) {
                                        return filtro.valor.indexOf(_valorPropriedade) > -1;
                                    }
                                    else {
                                        return _valorPropriedade && _valorPropriedade == filtro.valor;
                                    }
                                }
                            });
                            //Array.prototype.push.apply(retorno, _filtrados);
                        });
                    }
                    return removerDuplicatas(_vetor);
                };

                function gerarValoresFiltro(filtro) {
                    var retorno = [];
                    angular.element(obterLista()).each(function (iI, item) {
                        if (angular.isArray((angular.isFunction(filtro.propriedade) ? filtro.propriedade(item) : item[filtro.propriedade]))) {
                            retorno.push.apply(retorno, lodash.filter((angular.isFunction(filtro.propriedade) ? filtro.propriedade(item) : item[filtro.propriedade]), function (valores) {
                                return retorno.indexOf(valores) == -1;
                            }));
                        }
                        else if (retorno.indexOf(item[filtro.propriedade]) == -1) {
                            retorno.push((angular.isFunction(filtro.propriedade) ? filtro.propriedade(item) : item[filtro.propriedade]));
                        }
                    });
                    return removerDuplicatas(retorno);
                };

                function gerenciarValoresFiltros(filtros) {
                    var _retorno = [];
                    angular.forEach(filtros, function (filtro, iF) {
                        _retorno[iF] = gerarValoresFiltro(filtro);
                    });
                    return _retorno;
                };

                function removerDuplicatas(vetor) {
                    return lodash.uniqBy(vetor, function (item) {
                        return item;
                    });
                };

            }
        }

    }


})
();
