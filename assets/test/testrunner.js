require.config({
    baseUrl: '',
    paths: {
        jquery: 'assets/js/vendor/jquery-2.1.4',
        backbone: 'assets/js/vendor/backbone',
        text: 'assets/js/vendor/text',
        bootstrap : 'assets/js/vendor/bootstrap'
    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

// Add test suites as necessary...(you don't need to declare them as function args...they register themselves with Mocha on load)
define(['assets/test/combatRoundAttributeDeterminer-tests.js'],
    function() {
        mocha.run();
    });
