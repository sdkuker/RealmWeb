requirejs.config({
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
    //waitSeconds : 0,
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

    }
})

require(["realmApplication", 'marionette', 'underscore'], function (RealmApplication, Marionette, Underscore) {
    RealmApplication.start();
});
