define(
    ['domain/die/die'],
    function(Die) {
        var run = function() {
            test('GenerateRandomNumber should generate numbers in the right range', function() {
                ok(executeTestRepeatedly(Die.generateRandomNumber, 20, 1, 10),  'Random number generator: the return should be betwen 1 and 10.');
                ok(executeTestRepeatedly(Die.generateRandomNumber, 20, 1, 100), 'Random number generator: the return should be betwen 1 and 100.');
                ok(executeTestRepeatedly(Die.generateRandomNumber, 20, 10, 12), 'Random number generator: the return should be betwen 10 and 12.');
                ok(executeTestRepeatedly(Die.rollOpenEnded, 20, -200, 200), 'Roll open ended: the return should be betwen -200 and 200 (mostly).');
            });
        };
        var executeTestRepeatedly = function(functionToTest, numberOfTests, min, max) {
            var allPassed = true;
            for (index = 0; index < numberOfTests; index++) {
                var result = functionToTest(min, max);
                if (result < min || result > max) {
                    allPassed = false;
                };
            };
            return allPassed;
        };

        return {run: run}
    }
);