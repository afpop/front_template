(function () {
    'use strict';

    angular.module('softdaytimeline.directive', [])
        .directive('softDayTimeline', softDayTimeline);

    /** @ngInject */
    function softDayTimeline(lodash, $timeout, $filter) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                eventos: "=",
                loading: "=",
                config: '='
            },
            templateUrl: "app/components/softdaytimeline/softdaytimeline.template.html",
            link: function (scope, element, attrs) {

                scope.$watchCollection('eventos', function (novo, antigo) {
                    //calcularLayout();
                    //ajustarDivisorLegenda();
                    carregaEventos();
                });

                scope.$watchCollection('config', function (novo, antigo) {
                    calcularLayout();
                    ajustarDivisorLegenda();
                    carregaEventos();
                });

                var $$escalas;
                var $$horas = scope.config.horas || 24;
                var $$cores = ['#466f9e', '#5cb85c'];

                var $$timeline = angular.element(element[0].querySelector('.timeline-container'));
                var $$divisor = angular.element(element[0].querySelector('.divisor-container'));
                var $$legenda = angular.element(element[0].querySelector('.legenda-container'));

                var $$fillElement = '<div class="fill"></div>';
                var $$transparentElement = '<div class="transparent"></div>';
                var $$divisorElement = '<div class="divisor"></div>';
                var $$labelHoraElement = '<div class="hora-label"></div>';

                init();

                function init() {
                    calcularLayout();
                    ajustarDivisorLegenda();
                }

                function getLegenda(index) {
                    if (index == 0) return '';
                    return index + ':00';
                }

                function datetimeParaSegundos(date) {
                    var _date = Date.parse(date);
                    if (_date == NaN) return null;

                    var _date = new Date(date);
                    return _date.getHours() * 60 * 60 + _date.getMinutes() * 60 + _date.getSeconds();
                }

                function horasParaSegundos(hora) {
                    return hora * 60 * 60;
                }

                function ajustarDivisorLegenda() {
                    $$divisor.html('');
                    $$legenda.html('');

                    // Cria os divisores e legendas na tela
                    var $$ultimaHora = 0;
                    angular.forEach($$escalas, function (esc) {
                        for (var i = $$ultimaHora; i < esc.hora; i++) {
                            var $$tempDivisor = $$divisorElement;
                            var $$tempLabelHora = $$labelHoraElement;

                            $$tempDivisor = angular.element($$tempDivisor).css('width', esc.porcPorHora + '%');
                            $$tempLabelHora = angular.element($$tempLabelHora).css('width', esc.porcPorHora + '%').html(getLegenda(i));

                            $$divisor.append($$tempDivisor);
                            $$legenda.append($$tempLabelHora);
                        }
                        $$ultimaHora = esc.hora;
                    });

                }

                function calcularLayout() {
                    $$horas = scope.config.horas || 24;

                    var $$ultimaHora = 0;
                    $$escalas = lodash.sortBy(scope.config.escalas, ['hora']);

                    angular.forEach($$escalas, function (esc) {
                        esc.porcPorSegundo = esc.porcentagem / ((esc.hora - $$ultimaHora) * 60 * 60);
                        esc.porcPorHora = esc.porcPorSegundo * 60 * 60;
                        $$ultimaHora = esc.hora;
                    });
                }

                function carregaEventos() {
                    // Limpa a timeline
                    $$timeline.html('');
                    angular.element('.popover').remove();

                    // Converte as datas de inicio para segundos e salva na propriedade 'unit'.
                    var $$eventos = lodash.clone(scope.eventos);
                    angular.forEach($$eventos, function (evento) {
                        evento.segundoInicio = datetimeParaSegundos(evento.inicio);
                        evento.segundoFim = datetimeParaSegundos(evento.fim);
                    });
                    $$eventos = lodash.sortBy($$eventos, 'segundoInicio');

                    //
                    var ultimoSegundoEvento = 0;
                    var indexCor = 0;
                    angular.forEach($$eventos, function (evento) {

                        var $$ultimaHora = 0;
                        var $$porcentagemFill = 0;
                        var $$porcentagemTransp = 0;

                        angular.forEach($$escalas, function (escala) {
                            var maxFill = evento.segundoFim > horasParaSegundos(escala.hora) ? horasParaSegundos(escala.hora) : evento.segundoFim;
                            var minFill = evento.segundoInicio > horasParaSegundos($$ultimaHora) ? evento.segundoInicio : horasParaSegundos($$ultimaHora);
                            var diffFill = maxFill - minFill;
                            if (diffFill > 0)
                                $$porcentagemFill += diffFill * escala.porcPorSegundo;

                            var maxTransp = evento.segundoInicio > horasParaSegundos(escala.hora) ? horasParaSegundos(escala.hora) : evento.segundoInicio;
                            var minTransp = ultimoSegundoEvento < horasParaSegundos($$ultimaHora) ? horasParaSegundos($$ultimaHora) : ultimoSegundoEvento;
                            var diffTransp = maxTransp - minTransp;
                            if (diffTransp > 0)
                                $$porcentagemTransp += diffTransp * escala.porcPorSegundo;

                            $$ultimaHora = escala.hora;
                        });

                        // Cria div em branco para espaçar
                        if ($$porcentagemTransp) {
                            var $$temp = angular.element($$transparentElement).css('width', $$porcentagemTransp + '%');
                            $$timeline.append($$temp);
                        }

                        // Cria a div fill
                        var $$temp = angular.element($$fillElement)
                            .css('width', $$porcentagemFill + '%')
                            .attr('rel', 'popover');

                        if (evento.class)
                            $$temp.addClass(evento.class);

                        $$temp.css('background-color', $$cores[indexCor++]);
                        if (indexCor >= $$cores.length) indexCor = 0;

                        ultimoSegundoEvento = evento.segundoFim;
                        $$timeline.append($$temp);

                        $$temp.popover({
                            html: true,
                            content: '<b>Descrição:</b><br />' + evento.descricao + '<br /><br /><b>Início: </b>' + $filter('date')(evento.inicio, 'HH:mm:ss') + '<br /><b>Fim: </b>' + $filter('date')(evento.fim, 'HH:mm:ss'),
                            trigger: 'hover',
                            container: 'body',
                            placement: 'top'
                        });
                    });
                }
            }
        };

    }

})();


