(function () {
    'use strict';

    angular.module('menu-direito.directive', [])
        .directive('menuDireito', menuDireito);

    menuDireito.$injector = ['$state', 'menuService', 'cabecalhoAbasService', 'autenticacaoService', 'moduloService', 'cabecalhoService'];

    /** @ngInject */
    function menuDireito($state, menuService, cabecalhoAbasService, autenticacaoService, usuarioDataService, toastrService, moduloService, cabecalhoService) {

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controllerAs: 'controller',
            templateUrl: 'app/components/menu-direito/menu-direito.template.html',
            link: function (scope, element, attrs) {

                scope.isVisivel = menuService.isMenuDireitoVisivel;
                scope.obterItensMenuDireito = menuService.obterItensMenuDireito;
                scope.obterStyle = _obterStyle;
                scope.sair = _sair;
                scope.redirecionar = _redirecionar;
                scope.atualizarModuloInicial = _atualizarModuloInicial;
                scope.moduloInicial = moduloService.obterModuloInicial;

                function _obterStyle() {
                    return {'top': (cabecalhoAbasService.obterAlturaCabecalho() + 'px')};
                }

                function _sair (){
                    autenticacaoService.logout();
                }

                function _redirecionar(menu){
                    if(!menu || !menu.state) return;

                    $state.go(menu.state);
                    menuService.esconderMenuDireito();
                }

                function _atualizarModuloInicial(menu){

                    usuarioDataService.atualizarModuloInicial(menu.id)
                    .then(successo)
                    .catch(erro);

                    function successo() {

                        moduloService.setarModuloInicial(menu.state);

                        toastrService.sucesso("Aviso:", "Modulo inicial atualizado com sucesso!");

                        cabecalhoService.definirIcone(false);
                    }

                    function erro() {

                        toastrService.atencao('Atenção', 'Falha ao atualizar modulo inicial.');
                    }
                }
            }
        }

    }


})();
