define([],
    function () {

        Die = function() {
            // private variables
            var self = this;
            var openEndedRollUpperThreshold = 96;
            var openEndedRollLowerThreshold = 4;

            //private functions
            function generateRandomNumber(min, max) {
                return Math.floor(Math.random()*(max-min+1) + min);
            };

            //public functions
            this.roll = function(numberOfSidesOnDie) {
                return generateRandomNumber(1, numberOfSidesOnDie);
            };
        };

        var myDie = new Die();

        return myDie;

    });
