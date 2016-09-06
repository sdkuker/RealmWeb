require.config({
    baseUrl: '',
    paths: {
        jquery: '../js/vendor/jquery-2.1.4',
        backbone: '../js/vendor/backbone',
        text: '../js/vendor/text',
        bootstrap : '../js/vendor/bootstrap'
    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

// Add test suites as necessary...(you don't need to declare them as function args...they register themselves with Mocha on load)
define(['model-tests.js'],
    function() {
        mocha.run();
    });
