requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        backbone: 'vendor/backbone',
        jquery: 'vendor/jquery-2.1.4',
        json2: "vendor/json2",
        marionette: 'vendor/marionette',
        underscore: 'vendor/underscore'
    },

    shim: {
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        }
    }
})

require(["app"], function (Realm) {
    Realm.start();
    console.log("Realm has started");
});
