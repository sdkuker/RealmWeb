define(['jquery'
],
    function ($) {

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
            }

            // private functions - just like public without the 'this' before the function name


        };

        var myCombatRoundAttributeDeterminer = new CombatRoundAttributeDeterminer();

        return myCombatRoundAttributeDeterminer;

    });