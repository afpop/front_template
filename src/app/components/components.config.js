(function () {
    'use strict';

    angular
        .module('components',
        [
            'loading.directive',
            'loading.service',

            'combo.directive',
            'text-area.directive',
            'data.directive',
            'barra-etapa-fluxo.directive',
            'visualizacao-arvore.directive',
            'dados-atividade-nivel.directive',
            'lista-texto.directive',

            'cabecalho.directive',
            'cabecalho-abas.directive',

            'menu-direito.directive',

            'tabela.directive',
            'tabela-botao-menu.directive',
            'tabela-filtro.directive',
            'tabela-ordenador.directive',
            'tabela-paginacao.directive',
            'softdial.directive',
            'softdaytimeline.directive'
        ])

})();
