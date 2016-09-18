define(['jquery',
        'domain/die/die',
        'models/character/characterModel',
        'models/combat/characterCombatRoundStatisticModel',
        'collections/combat/characterCombatRoundStatisticCollection',
        'services/characterWarehouse',
        'collections/character/characterCollection',],
    function ($, Die, CharacterModel, StatisticModel, StatisticCollection, CharacterWarehouse, CharacterCollection) {

        CombatRoundAttributeDeterminer = function() {
            // all variables are private
            var self = this;
            var allStatisticsCollection = null;
            var allCharactersCollection = null;

            // public functions

            // base initiative before any random die rolls are added to it.
            this.determineBaseCombatInitiatieve = function(aCharacterModel) {
                if (aCharacterModel) {
                    return aCharacterModel.get('initiative') + aCharacterModel.get('initiativeModifier');
                }
            }

            // private functions - just like public without the 'this' before the function name


        };

        var myCombatRoundAttributeDeterminer = new CombatRoundAttributeDeterminer();

        return myCombatRoundAttributeDeterminer;

    });