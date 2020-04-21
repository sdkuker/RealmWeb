define(['jquery',
    'logger',
    'collections/combat/combatEncounterCollection'],
    function ($, Logger, CombatEncounterCollection) {

        // I am the first stop for getting combat encounters.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CombatEncounterWarehouse = function () {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatEncounterCollection';

            // public functions

            // Creates and persists a new encounter.  Adding to the 'all' collection.
            this.createCombatEncounter = function () {
                var deferred = $.Deferred();
                $.when(getCombatEncounterCollection()).then(
                    function (myAllCombatEncountersCollection) {
                        myAllCombatEncountersCollection.on('add', function (addedEncounter) {
                            deferred.resolve(addedEncounter);
                        })
                        myAllCombatEncountersCollection.add({description: 'Give me a good name!'});
                    }
                )
                return deferred.promise();
            };
            this.getAllCombatEncounters = function () {
                var deferred = $.Deferred();
                $.when(getCombatEncounterCollection()).then(
                    function (myCombatEncounterCollection) {
                        deferred.resolve(myCombatEncounterCollection);
                    }
                )
                return deferred.promise();
            };

            this.getCombatEncounterWithID = function (combatEncounterID) {
                var deferred = $.Deferred();
                $.when(getCombatEncounterCollection()).then(
                    function (myCombatEncounterCollection) {
                        deferred.resolve(myCombatEncounterCollection.get(combatEncounterID));
                    }
                )

                return deferred.promise();
            };

            this.getCombatEncounterWithoutWaitingWithID = function (combatEncounterID) {
                if (cache[collectionKey]) {
                    return cache[collectionKey].get(combatEncounterID);
                } else {
                    return 'not available';
                }
            };
            this.getCombatEncounterWithDescription = function (combatEncounterDescription) {
                var deferred = $.Deferred();
                $.when(getCombatEncounterCollection()).then(
                    function (myCombatEncounterCollection) {
                        deferred.resolve(myCombatEncounterCollection.findWhere({ description: combatEncounterDescription }));
                    }
                )

                return deferred.promise();
            };

            this.getCombatEncounterWithoutWaitingWithDescription = function (combatEncounterDescription) {
                if (cache[collectionKey]) {
                    return cache[collectionKey].findWhere({ description: combatEncounterDescription });
                } else {
                    return 'not available';
                }
            };

            // private functions
            getCombatEncounterCollection = function () {
                var deferred = $.Deferred();
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new CombatEncounterCollection();
                    cache[collectionKey].on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            }
        };

        var myCombatEncounterWarehouse = new CombatEncounterWarehouse();

        return myCombatEncounterWarehouse;

    });