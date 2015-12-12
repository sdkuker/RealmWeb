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
        parse: 'vendor/parse-1.6.7.min'
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
        'bootstrap': { deps: ['jquery'], exports: 'bootstrap' }

    }
})

require(["realmApplication", 'marionette', 'underscore', 'parse'], function (RealmApplication, Marionette, Underscore, Parse) {
    RealmApplication.start();
});
