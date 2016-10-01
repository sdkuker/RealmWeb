require.config({
    baseUrl: 'assets/js',
    paths: {
        backbone: 'vendor/backbone',
        jquery: 'vendor/jquery-2.1.4',
        json2: "vendor/json2",
        marionette: 'vendor/marionette',
        underscore: 'vendor/underscore',
        text: 'vendor/text',
        tpl: 'vendor/underscore-tpl',
        bootstrap: 'vendor/bootstrap',
        firebase: 'vendor/firebase',
        backfire: 'vendor/backbonefire',
        logger : 'utility/logger'
    },

    shim: {
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone', 'bootstrap'],
            exports: 'Marionette'
        },
        'tpl': {
            deps: ['text'],
            exports: ['tpl']
        },
        'firebase' : {
            exports : 'Firebase'
        },
        'backfire' : {
            deps : ['backbone', 'firebase', 'underscore'],
            exports : 'Backfire'
        },
        'bootstrap': { deps: ['jquery'], exports: 'bootstrap' }

    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

// Add test suites as necessary...(you don't need to declare them as function args...they register themselves with Mocha on load)
define(['./assets/js/test/combatRoundAttributeDeterminer-tests.js', './assets/js/test/domain-die-tests.js',
        './assets/js/test/characterCombatRoundStatisticModel-tests.js'],
    function() {
        mocha.run();
    });
