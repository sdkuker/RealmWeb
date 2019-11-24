define([],
    function () {

        ResistanceCalculator = function() {
            // private variables
            var self = this;

            //public functions
            this.calculateRollRequiredToResistAttack = function(attackerLevel, targetLevel) {
                var resistanceRequired = 0;
                var attackerComponent = 0;
                var targetComponent = 0;

                if (attackerLevel > 15) {
                    attackerComponent = 30 + attackerLevel;
                } else {
                    if (attackerLevel > 10) {
                        attackerComponent = 35 + ((attackerLevel - 10) * 2);
                    } else {
                        if (attackerLevel > 5) {
                            attackerComponent = 20 + ((attackerLevel - 5) * 3);
                        } else {
                            attackerComponent = (attackerLevel - 1) * 5;
                        }
                    }
                };

                if (targetLevel > 15) {
                    targetComponent = 30 + targetLevel;
                } else {
                    if (targetLevel > 10) {
                        targetComponent = 35 + ((targetLevel - 10) * 2);
                    } else {
                        if (targetLevel > 5) {
                            targetComponent = 20 + ((targetLevel - 5) * 3);
                        } else {
                            targetComponent = (targetLevel - 1) * 5;
                        }
                    }
                };

                resistanceRequired = 50 + attackerComponent - targetComponent;

                return resistanceRequired;
            };
        };

        var myCalculator = new ResistanceCalculator();

        return myCalculator;

    });
