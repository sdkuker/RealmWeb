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
            this.rollOpenEnded = function() {
                var theReturn = 0;
                var finished = false;
                var lastRollWasOpenEndedDown = false;

                while (! finished) {
                    var currentRoll = generateRandomNumber(1, 100);
                    if (lastRollWasOpenEndedDown) {
                        theReturn = theReturn - currentRoll;
                    } else {
                        theReturn = theReturn + currentRoll;
                    };
                    if (currentRoll < openEndedRollUpperThreshold) {
                        finished = true;
                    };
                    if (currentRoll > openEndedRollLowerThreshold) {
                        lastRollWasOpenEndedDown = false;
                    } else {
                        lastRollWasOpenEndedDown = true;
                    };
                };
                return theReturn;
            };
            this.rollOpenEndedUp = function() {
                var theReturn = 0;
                var finished = 0;
                while(! finished) {
                    var currentRoll = generateRandomNumber(1, 100);
                    theReturn = theReturn + currentRoll;
                    if (currentRoll < openEndedRollUpperThreshold) {
                        finished = true;
                    };
                };
                return theReturn;
            };
            this.rollOpenEndedDown = function() {
                var theReturn = 0;
                var finished = false;
                var lastRollWasOpenEndedDown = false;
                while (! finished) {
                    var currentRoll = generateRandomNumber(1, 100);
                    if (lastRollWasOpenEndedDown) {
                        theReturn = theReturn - currentRoll;
                    } else {
                        theReturn = theReturn + currentRoll;
                    };
                    if (currentRoll > openEndedRollLowerThreshold) {
                        finished = true;
                        lastRollWasOpenEndedDown = false;
                    } else {
                        lastRollWasOpenEndedDown = true;
                    };
                };
                return theReturn;
            }
        };

        var myDie = new Die();

        return myDie;

    });
