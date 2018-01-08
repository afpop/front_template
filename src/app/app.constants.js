(function () {
    'use strict';

    angular.module('constants-config', [])
        .constant(
        'API', {
            URL: 'http://localhost:22700/api/'
            //URL: 'http://' + window.location.host + '/EzTask.WebAPI/api/'
        });
})();