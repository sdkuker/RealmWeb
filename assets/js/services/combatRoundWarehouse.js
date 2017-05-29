define(['jquery',
        'logger',
        'collections/combat/combatRoundCollection',
        'services/combatRoundFactory',
        'services/characterCombatRoundStatisticWarehouse',
        'services/combatRoundCriticalHitWarehouse'],
    function ($, Logger, CombatRoundCollection, CombatRoundFactory, CombatRoundStatisticWarehouse,
              CombatRoundCriticalHitWarehouse) {

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
                $.when(getCombatRoundCollectionForEncounter(combatEncounter.get('id'))). then(
                    function(myCombatRoundCollection) {
                        if (! combatEncounter.hasAnyRounds() ) {
                            $.when(self.createNextCombatRoundsForEncounter(combatEncounter)). then(
                                function(newCombatRoundCollection) {
                                    deferred.resolve(newCombatRoundCollection);
                                }
                            )
                        } else {
                            deferred.resolve(myCombatRoundCollection);  
                        }
                    }
                )

                return deferred.promise();
            };

            // return the open round for the input encounter.  Return null if there is no open round.
            this.getOpenRoundForEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                if (combatEncounter) {
                    $.when(getCombatRoundCollectionForEncounter(combatEncounter.get('id'))). then(
                        function(myCombatRoundCollection) {
                            var openRound = myCombatRoundCollection.findWhere({roundNumber: combatEncounter.get('openRound')});
                            if (openRound) {
                                deferred.resolve(openRound);
                            } else {
                                deferred.reject('No open round found');
                            }
                        }
                    )
                } else {
                    deferred.reject('No combat encounter was provided');
                }


                return deferred.promise();

            };

            // return the round previous to the input argument - i.e. return round 1 if round 2 is sent in
            this.getPreviousCombatRound = function(combatRound) {
                var deferred = $.Deferred();

                $.when(getCombatRoundCollectionForEncounter(combatRound.get('encounterID'))). then(
                    function(myCombatRoundCollection) {
                        var previousRoundNumber = combatRound.get('roundNumber') - 1;
                        var previousRound = myCombatRoundCollection.findWhere({roundNumber: previousRoundNumber});
                        if (previousRound) {
                            deferred.resolve(previousRound);
                        } else {
                            deferred.reject('No previous round found');
                        }
                    }
                )

                return deferred.promise();

            };

            this.createNextCombatRoundsForEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollectionForEncounter(combatEncounter.get('id'))). then(
                    function(myCombatRoundCollection) {
                        $.when(CombatRoundFactory.createNextCombatRound(combatEncounter, myCombatRoundCollection)). then(
                            function() {
                                deferred.resolve(myCombatRoundCollection);
                            }
                        )
                    }
                )

                return deferred.promise();
            };

            this.deleteCombatRoundsForEncounter = function(combatEncounter) {
                var deferred = $.Deferred();
                var self = this;
                $.when(getCombatRoundCollectionForEncounter(combatEncounter.get('id'))).then(
                    function(myCombatRoundCollection) {
                        var arrayOfRoundDeferred = [];
                        myCombatRoundCollection.each(function(combatRound, index) {
                            arrayOfRoundDeferred.push(self.deleteRoundAndStatisticsForRound(combatRound));
                        });
                       $.when.apply($, arrayOfRoundDeferred).then(function() {
                           deferred.resolve();
                       });
                    }
                )

                return deferred.promise();
            };

            this.deleteRoundAndStatisticsForRound = function(combatRound) {
                var deferred = $.Deferred();
                if (combatRound && combatRound.get('id') != undefined) {
                    $.when(CombatRoundCriticalHitWarehouse.deleteCombatRoundCriticalHitsForRound(combatRound.get('id'))).then (
                        function() {
                            $.when(CombatRoundStatisticWarehouse.removeCombatRoundStatisticsForRound(combatRound)).then(
                                function() {
                                    $.when(CombatRoundFactory.removeCombatRound(combatRound)).then(
                                        function() {
                                            deferred.resolve();
                                        }
                                    )
                                }
                            )
                        }
                    )

                } else {
                    deferred.resolve();
                }

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
            getCombatRoundCollectionForEncounter = function(anEncounterID) {
               // var myKey = collectionKey + 'encounter:' + encounter.get('id');
                var myKey = collectionKey + 'encounter:' + anEncounterID;
                var deferred = $.Deferred();
                if (cache[myKey]) {
                    deferred.resolve(cache[myKey]);
                } else {
                    var myCollection = new CombatRoundCollection(null, {encounterID : anEncounterID});
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