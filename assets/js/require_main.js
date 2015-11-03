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
        bootstrapDialog : 'vendor/bootstrap-dialog',
        bootstrap: 'vendor/bootstrap.min',
        typeahead: 'vendor/bootstrap3-typeahead.min'
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
        'bootstrap': { deps: ['jquery'], exports: 'bootstrap' },
        'typeahead': { deps: ['jquery', 'bootstrap'] },
        'bootstrapDialog': { deps: ['bootstrap'] },

    }
})

require(["realmApplication"], function (RealmApplication) {
    RealmApplication.start();
});
