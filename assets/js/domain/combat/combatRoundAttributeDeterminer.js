define(['jquery', 'domain/die/die'
],
    function ($, Die) {

        CombatRoundAttributeDeterminer = function() {
            // all variables are private
            var self = this;
            var allStatisticsCollection = null;
            var allCharactersCollection = null;

            // public functions

            // base initiative before any random die rolls are added to it.
            this.determineBaseCombatInitiative = function(aCharacterModel) {
                if (aCharacterModel) {
                    return aCharacterModel.get('initiative') + aCharacterModel.get('initiativeModifier');
                }
            };

            // returns base initiative plus ann open ended roll of the die
            this.determineRoundInitiative = function(aCharacterModel) {
                if (aCharacterModel) {
                    return this.determineBaseCombatInitiative(aCharacterModel) + Die.rollOpenEnded();
                }
            };

            // base alertrness before any random die rolls are added to it.
            this.determineBaseCombatAlertness = function(aCharacterModel) {
                if (aCharacterModel) {
                    return aCharacterModel.get('alertnessSkill');
                }
            };

            // returns base alertness plus ann open ended roll of the die
            this.determineRoundAlertness = function(aCharacterModel) {
                if (aCharacterModel) {
                    return this.determineBaseCombatAlertness(aCharacterModel) + Die.rollOpenEnded();
                }
            };

            // base observation before any random die rolls are added to it.
            this.determineBaseCombatObservation = function(aCharacterModel) {
                if (aCharacterModel) {
                    return aCharacterModel.get('observationSkill');
                }
            };

            // returns base observation plus ann open ended roll of the die
            this.determineRoundObservation = function(aCharacterModel) {
                if (aCharacterModel) {
                    return this.determineBaseCombatObservation(aCharacterModel) + Die.rollOpenEnded();
                }
            };

            // returns the number or rounds still stunned to start this round
            this.determineNumberOfRoundsStillStunned = function(numberOfRoundsStillStunnedLastRound) {
                if (numberOfRoundsStillStunnedLastRound > 0) {
                    return numberOfRoundsStillStunnedLastRound - 1;
                } else {
                    return 0;
                }
            };

            // private functions - just like public without the 'this' before the function name


        };

        var myCombatRoundAttributeDeterminer = new CombatRoundAttributeDeterminer();

        return myCombatRoundAttributeDeterminer;

    });