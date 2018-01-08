(function () {
    'use strict';

    angular.module('cabecalho.directive', [])
        .directive('cabecalho', cabecalho);

    cabecalho.$injector = ['cabecalhoService', 'menuService'];

    /** @ngInject */
    function cabecalho(cabecalhoService, menuService, $state) {

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controllerAs: 'controller',
            templateUrl: 'app/components/cabecalho/cabecalho.template.html',
            link: function (scope, element, attrs) {

                scope.isVisivel = cabecalhoService.isVisivel;
                scope.obterMensagemCabecalho = cabecalhoService.obterMensagem;
                scope.obterTituloCabecalho = cabecalhoService.obterTitulo;
                scope.alternarVisibilidadeMenuDireito = _alternarVisibilidadeMenuDireito;
                scope.usuario = cabecalhoService.obterUsuario;
                scope.iconeCabecalho = cabecalhoService.obterIcone;
                scope.redirecionarInicio = _redirecionarInicio;

                function _alternarVisibilidadeMenuDireito() {
                    menuService.isMenuDireitoVisivel() ? menuService.esconderMenuDireito() : menuService.exibirMenuDireito();
                    cabecalhoService.definirIcone(menuService.isMenuDireitoVisivel());
                }

                function _redirecionarInicio(){

                    scope.state = localStorage.getItem("moduloInicial");

                    if(scope.state)
                        $state.go(scope.state);
                    else
                        $state.go("app.painel");

                }
            }
        }
    }


})();
