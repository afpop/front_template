(function () {
    'use strict';

    angular.module('visualizacao-arvore.directive', [])
        .directive('visualizacaoArvore', visualizacaoArvore);

    /** @ngInject */
    function visualizacaoArvore(lodash) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                lista: '=',
                titulo: '=',
                opcoes: '=',
                opcoesRightClick: '=',
                selecionado: '=',
                aoSelecionar: '=',
                isBloqueado: '=',
                eventosExpostos: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/visualizacao-arvore/visualizacao-arvore.template.html',
            link: function (scope, element, attrs) {

                scope.obterListaExibicao = _obterListaExibicao;
                scope.obterItemTitulo = _obterItemTitulo;
                scope.obterProximoNivelLista = _obterProximoNivelLista;
                scope.obterProximoNivelItemTitulo = _obterProximoNivelItemTitulo;
                scope.obterProximoNivelOpcoes = _obterProximoNivelOpcoes;
                scope.obterOpcoesRightClick = _obterOpcoesRightClick;
                scope.eListaAberta = _eListaAberta;
                scope.alternarListaExibicao = _alternarListaExibicao;
                scope.selecionar = _selecionar;
                scope.eSelecionado = _eSelecionado;
                scope.estaBloqueado = _estaBloqueado;
                scope.estaEmExecucao = _estaEmExecucao;
                scope.estaCompleto = _estaCompleto;

                /* Eventos expostos à View do Painel */
                scope.controleInternoEventosExpostos = scope.eventosExpostos || {};
                scope.controleInternoEventosExpostos.alternarListaExibicao = _alternarListaExibicao;

                var _itemSelecionado = null;
                var _listaVazia = [];
                var _listaAbertos = [];

                function _obterListaExibicao() {
                    var _atributo = 'lista';
                    return scope[_atributo] ? scope[_atributo] : _listaVazia;
                }

                function _obterItemTitulo(item) {
                    var _atributo = 'titulo';
                    if (scope[_atributo]) {
                        return angular.isFunction(scope[_atributo]) ? scope[_atributo](item) : item[scope[_atributo]];
                    }
                    else {
                        return '';
                    }
                }

                function _obterProximoNivelLista(item) {
                    var _atributo = 'listaProximoNivel';
                    if (scope.opcoes[_atributo]) {
                        return angular.isFunction(scope.opcoes[_atributo]) ? scope.opcoes[_atributo](item) : item[scope.opcoes[_atributo]];
                    }
                    else {
                        return _listaVazia;
                    }
                }

                function _obterOpcoesRightClick() {
                    if (_estaBloqueado()) return [];

                    if(angular.isFunction(scope.opcoesRightClick))
                        return scope.opcoesRightClick();
                        
                    return scope.opcoesRightClick;
                }

                function _selecionar(item) {
                    if (_estaBloqueado()) return;

                    // if (_itemSelecionado == item) {
                    //     _itemSelecionado = undefined;
                    //     scope.aoSelecionar ? scope.aoSelecionar(undefined) : angular.noop();
                    // }
                    // else {
                    _itemSelecionado = lodash.cloneDeep(item);
                    scope.aoSelecionar ? scope.aoSelecionar(_itemSelecionado) : angular.noop();
                    // }

                }

                function _estaEmExecucao(item){
                    if(!item || !item.porcentagem)
                        return false;

                    if(item.porcentagem > 0 && item.porcentagem < 100) return true;
                    else return false;
                }

                function _estaCompleto(item){
                    if(!item || !item.porcentagem)
                        return false;

                    if(item.porcentagem >= 100) return true;
                    else return false;
                }

                function _estaBloqueado() {
                    var _atributo = 'isBloqueado';
                    if (scope[_atributo]) {
                        return angular.isFunction(scope[_atributo]) ? scope[_atributo]() : scope[_atributo];
                    }
                }

                function _obterProximoNivelItemTitulo() {
                    var _atributo = 'tituloProximoNivel';
                    return scope.opcoes[_atributo] ? scope.opcoes[_atributo] : scope.titulo;
                }

                function _obterProximoNivelOpcoes() {
                    var _atributo = 'opcoesProximoNivel';
                    return scope.opcoes[_atributo] ? scope.opcoes[_atributo] : scope.opcoes;
                }

                function _eListaAberta(item) {
                    return _listaAbertos.indexOf(item) > -1;
                }

                function _eSelecionado(item) {
                    if (angular.isFunction(scope.selecionado)) {
                        return scope.selecionado(item);
                    }
                    else if (angular.isObject(scope.selecionado)) {
                        return scope.selecionado == item;
                    }
                    else {
                        return item == _itemSelecionado;
                    }
                }

                function _alternarListaExibicao(item) {
                    if (_estaBloqueado()) return;

                    if (_eListaAberta(item)) {
                        _fecharLista(item);
                    } else {
                        _abrirLista(item);
                    }
                }

                function _abrirLista(item) {
                    _listaAbertos.push(item);
                }

                function _fecharLista(item) {
                    lodash.remove(_listaAbertos, function (_item) {
                        return item == _item;
                    })
                }

            }
        }

    }


})();
