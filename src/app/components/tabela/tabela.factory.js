(function () {
    'use strict';
    angular.module('tabela.data-service', [])
        .factory('tabelaDataService', tabelaDataService);

    /** @ngInject */
    function tabelaDataService() {

        var _dataService = this;

        _dataService.Coluna = _Coluna;
        _dataService.Tabela = _Tabela;

        return _dataService


        function _Coluna(titulo, propriedade, largura, opcoes) {

            this.titulo = titulo;
            this.propriedade = propriedade;
            this.largura = angular.isNumber(largura) ? largura : undefined;
            var _opcoes = angular.isObject(largura) ? largura : opcoes;
            if (_opcoes) {
                for (var chave in _opcoes) {
                    this[chave] = _opcoes[chave];
                }
            }

            return this;

        }

        function _Tabela(titulo, colunas, linhas, opcoes) {

            this.titulo = titulo;
            this.colunas = colunas;
            this.linhas = linhas;
            this.opcoes = {};
            if (opcoes) {
                for (var chave in opcoes) {
                    this.opcoes[chave] = opcoes[chave];
                }
            }

            return this;

        }

        

    };

})();
