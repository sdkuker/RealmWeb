define(['jquery',
        'logger',
        'collections/combat/combatRoundCollection'],
    function ($, Logger, CombatRoundCollection) {

        // I am the first stop for getting combat rounds.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CombatRoundWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatRoundCollection';

            // public functions
            this.getAllCombatRounds = function() {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollection()).then(
                    function(myCombatRoundCollection) {
                        deferred.resolve(myCombatRoundCollection);
                    }
                )
                return deferred.promise();
            };

            this.getCombatRoundsForEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollectionForEncounter(combatEncounter)). then(
                    function(myCombatRoundCollection) {
                        deferred.resolve(myCombatRoundCollection);
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
                    cache[myKey] = new CombatRoundCollection({}, {encounterID : encounter.get('id')});
                    cache[myKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            getCombatRoundCollection = function() {
                var deferred = $.Deferred();
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new CombatRoundCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myCombatRoundWarehouse = new CombatRoundWarehouse();

        return myCombatRoundWarehouse;

    });