requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        backbone: 'vendor/backbone',
        jquery: 'vendor/jquery-2.1.4',
        json2: "vendor/json2",
        marionette: 'vendor/marionette',
        underscore: 'vendor/underscore',
        text: 'vendor/text',
        tpl: 'vendor/underscore-tpl'
    },

    shim: {
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'tpl': {
            deps: ['text'],
            exports: ['tpl']
        }
    }
})

require(["realmApplication"], function (RealmApplication) {
    RealmApplication.start();
});
