define(
    ['domain/die/die'],
    function (Die) {
        var run = function () {
            test('GenerateRandomNumber should generate numbers in the right range', function () {
                ok(executeTestRepeatedly(Die.roll, 20, 1, 10), 'Random number generator: the return should be betwen 1 and 10.');
                ok(executeTestRepeatedly(Die.roll, 20, 1, 100), 'Random number generator: the return should be betwen 1 and 100.');
                ok(executeTestRepeatedly(Die.roll, 20, 1, 6), 'Random number generator: the return should be betwen 1 and 6.');
                ok(executeTestRepeatedly(Die.rollOpenEnded, 20, -200, 200), 'Roll open ended: the return should be betwen -200 and 200 (mostly).');
                ok(executeTestRepeatedly(Die.rollOpenEndedUp, 20, 1, 200), 'Roll open ended up: the return should be betwen 1 and 200 (mostly).');
                ok(executeTestRepeatedly(Die.rollOpenEndedDown, 20, -100, 100), 'Roll open ended down: the return should be betwen -100 and 100 (mostly).');
            });
        };
        var executeTestRepeatedly = function (functionToTest, numberOfTests, min, max) {
            var allPassed = true;
            for (index = 0; index < numberOfTests; index++) {
                var result = functionToTest(min, max);
                if (result < min || result > max) {
                    allPassed = false;
                }
                ;
            }
            ;
            return allPassed;
        };

        return {run: run}
    }
);