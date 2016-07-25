define(['jquery',
        'logger',
        'collections/combat/combatRoundCollection',
        'services/combatRoundFactory'],
    function ($, Logger, CombatRoundCollection, CombatRoundFactory) {

        // I am the first stop for getting combat rounds.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CombatRoundWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatRoundCollection';

            // public functions

            this.getCombatRoundsForEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollectionForEncounter(combatEncounter)). then(
                    function(myCombatRoundCollection) {
                        if (! combatEncounter.hasAnyRounds() ) {
                            $.when(CombatRoundFactory.createNextCombatRound(combatEncounter, myCombatRoundCollection)). then(
                                function() {
                                    deferred.resolve(myCombatRoundCollection);
                                }
                            )
                        } else {
                            deferred.resolve(myCombatRoundCollection);  
                        }
                    }
                )

                return deferred.promise();
            };

            this.getCombatRoundWithID = function(combatRoundID) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollection()). then(
                    function(myCombatRoundCollection) {
                        deferred.resolve(myCombatRoundCollection.get(combatRoundID));
                    }
                )

                return deferred.promise();
            };

            this.getCombatRoundWithoutWaitingWithID = function(combatRoundID) {
                if (cache[collectionKey]) {
                    return cache[collectionKey].get(combatRoundID);
                } else {
                    return 'not available';
                }
            };

            // private functions
            getCombatRoundCollectionForEncounter = function(encounter) {
                var myKey = collectionKey + 'encounter:' + encounter.get('id');
                var deferred = $.Deferred();
                if (cache[myKey]) {
                    deferred.resolve(cache[myKey]);
                } else {
                    var myCollection = new CombatRoundCollection({}, {encounterID : encounter.get('id')});
                    myCollection.on('sync',function(collection) {
                        cache[myKey] = collection;
                        deferred.resolve(cache[myKey]);
                    })
                }
                return deferred.promise();
            };
            
        };

        var myCombatRoundWarehouse = new CombatRoundWarehouse();

        return myCombatRoundWarehouse;

    });