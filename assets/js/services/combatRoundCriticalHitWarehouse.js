define(['jquery',
        'logger',
        'collections/combat/combatRoundCriticalHitCollection'],
    function ($, Logger, CombatRoundCriticalHitCollection) {

        // I am the first stop for getting combat round critical hits.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.
        // If I have them in my cache, I'll return them.

        CombatRoundCriticalHitWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatEncounterCriticalHitCollection';

            // public functions
            this.getAllCombatRoundCriticalHits = function() {
                var deferred = $.Deferred();
                $.when(getCombatRoundCriticalHitCollection()).then(
                    function(myCombatRoundCriticalHitCollection) {
                        deferred.resolve(myCombatRoundCriticalHitCollection);
                    }
                )
                return deferred.promise();
            };

            this.getCombatRoundCriticalHitsForCharacterForEncounter = function(aCharacterID, anEncounterID) {
                var deferred = $.Deferred();

                $.when(getCombatRoundCriticalHitCollection()).then(
                    function(myCombatRoundCriticalHitCollection) {
                        var selectedModelArray = myCombatRoundCriticalHitCollection.filter(function(combatRoundCriticalHitModel) {
                            var isItAMatch =  combatRoundCriticalHitModel.get('combatEncounterID') === anEncounterID &&
                                combatRoundCriticalHitModel.get('characterID') === aCharacterID;
                            return isItAMatch;
                        });
                        deferred.resolve(selectedModelArray);
                    }
                )
                return deferred.promise();
            };

            this.getCombatRoundCriticalHitsForRound = function(combatRoundID) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCriticalHitCollection()). then(
                    function(myCombatRoundCriticalHitsCollection) {
                        deferred.resolve(myCombatRoundCriticalHitsCollection.get(combatRoundID));
                    }
                )

                return deferred.promise();
            };

            // persists the critical hit for the round.  Adding to the 'all' collection - should also appear in any
            // encounter specific collections that the critial hit for round belongs to.
            this.addCombatRoundCriticalHit = function(aCombatEncounterID, aCombatRoundID, aCombatRoundNumber, aCharacterID, aCriticalHitID, aCriticalHitDescription) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCriticalHitCollection()).then (
                    function(myAllRoundCriticalHitCollection) {
                        myAllRoundCriticalHitCollection.on('add', function(addedCombatRoundCriticalHit) {
                            deferred.resolve(addedCombatRoundCriticalHit);
                        });
                        var timestamp = (new Date()).getTime();
                        myAllRoundCriticalHitCollection.add(
                            {combatEncounterID: aCombatEncounterID, combatRoundID : aCombatRoundID, combatRoundNumber : aCombatRoundNumber,
                                characterID : aCharacterID, criticalHitID: aCriticalHitID, criticalHitDescription : aCriticalHitDescription,
                                timeOfHit : timestamp});
                    }
                )
                return deferred.promise();
            };

            // private functions
            getCombatRoundCriticalHitCollection = function() {
                var deferred = $.Deferred();
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new CombatRoundCriticalHitCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            }
        };

        var myCombatRoundCriticalHitWarehouse = new CombatRoundCriticalHitWarehouse();

        return myCombatRoundCriticalHitWarehouse;

    });