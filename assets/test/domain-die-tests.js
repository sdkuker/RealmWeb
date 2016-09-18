define(['jquery', 'assets/js/domain/die/die'],function($, Die) {
    mocha.ui('bdd');
    var assert = chai.assert;
    var expect = chai.expect;

    /* Tests */

    describe('Die', function() {

        describe('GenerateRandomNumber should generate numbers in the right range', function() {
            it('Random number generator: the return should be betwen 1 and 10', function() {
                assert.isOk(executeTestRepeatedly(Die.roll, 20, 1, 10));
            });
            it('Random number generator: the return should be betwen 1 and 100.', function() {
                assert.isOk(executeTestRepeatedly(Die.roll, 20, 1, 100));
            });
            it('Random number generator: the return should be betwen 1 and 6', function() {
                assert.isOk(executeTestRepeatedly(Die.roll, 20, 1, 6));
            });
            it('Roll open ended: the return should be betwen -200 and 200 (mostly).', function() {
                assert.isOk(executeTestRepeatedly(Die.rollOpenEnded, 20, -200, 200));
            });
            it('Roll open ended up: the return should be betwen 1 and 200 (mostly).', function() {
                assert.isOk(executeTestRepeatedly(Die.rollOpenEndedUp, 20, 1, 200));
            });
            it('Roll open ended down: the return should be betwen -100 and 100 (mostly).', function() {
                assert.isOk(executeTestRepeatedly(Die.rollOpenEndedDown, 20, -100, 100));
            });
        });

    });

    var executeTestRepeatedly = function (functionToTest, numberOfTests, min, max) {
        var allPassed = true;
        for (index = 0; index < numberOfTests; index++) {
            var result = functionToTest(max);
            if (result < min || result > max) {
                allPassed = false;
            }
            ;
        }
        ;
        return allPassed;
    };

});