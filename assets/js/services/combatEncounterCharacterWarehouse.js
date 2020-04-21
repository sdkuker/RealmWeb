define(['jquery',
        'logger',
        'services/CombatEncounterCharacterFactory'],
    function ($, Logger, CombatEncounterCharacterFactory) {

        // I am the first stop for getting combat encounter characters.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CombatEncounterCharacterWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatEncounterCharacterCollection';

            // public functions

            this.getCombatEncounterCharactersForEncounter = function(combatEncounterModel) {
                var deferred = $.Deferred();
                var self = this;
                $.when(getCombatEncounterCharacterCollectionForEncounter(combatEncounterModel)). then(
                    function(myCombatEncounterCharacterCollection) {
                        deferred.resolve(myCombatEncounterCharacterCollection); 
                    }
                )

                return deferred.promise();
            };

            this.deleteCombatEncounterCharacterFromEncounter = function(combatEncounterCharacterModel) {
                var deferred = $.Deferred();
                var self = this;
                $.when(CombatEncounterCharacterFactory.removeCharacterFromEncounter(combatEncounterCharacterModel)).then(
                    function() {
                        deferred.resolve();
                    }
                )
                return deferred.promise();
            };

            this.deleteAllCombatEncounterCharactersFromEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                var self = this;
                $.when(getCombatEncounterCharacterCollectionForEncounter(combatEncounter.get('id'))).then(
                    function(myCombatEncounterCharacterCollection) {
                        var arrayOfCharactersDeferred = [];
                        myCombatEncounterCharacterCollection.each(function(combatRoundCharacter, index) {
                            arrayOfCharactersDeferred.push(CombatEncounterCharacterFactory.removeCharacterFromEncounter(combatRoundCharacter));
                        });
                       $.when.apply($, arrayOfCharactersDeferred).then(function() {
                           deferred.resolve();
                       });
                    }
                )

                return deferred.promise();
            };

            // private functions
            getCombatEncounterCharacterCollectionForEncounter = function(combatEncounterModel) {
                var myKey = collectionKey + 'encounter:' + combatEncounterModel.get('id');
                var deferred = $.Deferred();
                if (cache[myKey]) {
                    deferred.resolve(cache[myKey]);
                } else {
                    $.when(CombatEncounterCharacterFactory.getCharactersForEncounter(combatEncounterModel)).then(
                        function(myCollection) {
                            cache[myKey] = myCollection;
                            deferred.resolve(cache[myKey]);
                        }
                    )
                }
                return deferred.promise();
            };
            
        };

        var myCombatEncounterCharacterWarehouse = new CombatEncounterCharacterWarehouse();

        return myCombatEncounterCharacterWarehouse;

    });