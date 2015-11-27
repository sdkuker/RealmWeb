require.config({
    baseUrl: 'assets/js',
    paths: {
        'QUnit': 'vendor/qunit-1.20.0'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

// require the unit tests.
require(
    ['QUnit',
     'tests/unitTests/domain/die/dieTest'],
    function(QUnit, DieTest) {
        // run the tests.
        DieTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);