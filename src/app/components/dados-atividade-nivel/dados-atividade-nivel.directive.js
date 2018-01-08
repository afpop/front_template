(function () {
    'use strict';

    angular.module('dados-atividade-nivel.directive', [])
        .directive('dadosAtividadeNivel', dadosAtividadeNivel);

    dadosAtividadeNivel.$injector = ['lodash', '$filter', 'equipeDataService', 'usuarioDataService', 'tipoRequisicaoDataService','permissaoService']

    /** @ngInject */
    function dadosAtividadeNivel(lodash, $filter, equipeDataService, usuarioDataService, tipoRequisicaoDataService, permissaoService) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                modelo: '=',
                listasCombo: '=',
                propriedadesExibicaoCombo: '=',
                placeholdersCombo: '=',
                fnSalvar: '=',
                fnCancelar: '=',
                fnEditar: '=',
                estaEditando: '=',
                bloquearPainel: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/dados-atividade-nivel/dados-atividade-nivel.template.html',
            link: function (scope, element, attrs) {

                var _modelo;
                var _formatoNota;

                scope.estaEditando = scope.estaEditando || false;
                scope.obterModelo = _obterModelo;
                scope.obterFormatoNota = _obterFormatoNota;
                scope.salvar = _salvar;
                scope.cancelar = _cancelar;
                scope.editar = _editar;
                scope.temTarefasFilhas = _temTarefasFilhas;
                scope.obterPermissao = _obterPermisssao;

                scope.data = [
                    { text: "100%", value: 100, class: "pie-100" },
                    { text: "75%", value: 75, class: "pie-75" },
                    { text: "50%", value: 50, class: "pie-50" },
                    { text: "25%", value: 25, class: "pie-25" },
                    { text: "0%", value: 0 }
                ];

                scope.sdModel = {};

                _init();

                function _obterPermisssao(acao){
                    return permissaoService.obterPermissao(acao);
                }

                function _init() {
                    _formatoNota = _gerarFormatoNota();
                }

                function _salvar() {
                    var _atributo = 'fnSalvar';
                    if (scope[_atributo]) {
                        if (angular.isFunction(scope[_atributo]))
                            scope[_atributo]();
                    }
                }

                function _cancelar() {
                    var _atributo = 'fnCancelar';
                    if (scope[_atributo]) {
                        if (angular.isFunction(scope[_atributo]))
                            scope[_atributo]();
                    }
                }

                function _editar() {
                    var _atributo = 'fnEditar';
                    if (scope[_atributo]) {
                        if (angular.isFunction(scope[_atributo]))
                            scope[_atributo]();
                    }

                    scope.estaEditando = true;
                }
                
                function _obterModelo() {
                    return scope.modelo ? scope.modelo : _modelo;
                }

                scope.solicitante = _obterModelo().solicitante;

                function _temTarefasFilhas() {
                    var modelo = _obterModelo();
                    if (!modelo) return true;

                    if (modelo.tarefas && angular.isArray(modelo.tarefas) && modelo.tarefas.length > 0)
                        return true;
                    else
                        return false;
                }

                function _obterFormatoNota() {
                    return _formatoNota;
                }

                function _gerarFormatoNota() {
                    return {
                        propriedadeTexto: 'nota',
                        title: function (item) {
                            return item.usuario.nome;
                        },
                        prefixo: function (item) {
                            return $filter('date')(item.data, 'dd/MM/yyyy hh:mm', undefined) + ' - ';
                        }
                    };
                }

                scope.selecionaTudo = function ($event) {
                    $event.target.select();
                }

                scope.$watch('obterModelo().horas', function () {

                    if (!angular.equals(_obterModelo(), undefined)) {

                        if (!angular.equals(_obterModelo().horas, undefined)) {

                            _obterModelo().horas = _obterModelo().horas.replace(/\D/g, "");//Remove tudo o que não é dígito
                            _obterModelo().horas = _obterModelo().horas.replace(/(\d)(\d{2})$/, "$1:$2");//coloca a virgula antes dos 2 últimos dígitos

                        }
                    }
                });
            }
        }

    }
})();

