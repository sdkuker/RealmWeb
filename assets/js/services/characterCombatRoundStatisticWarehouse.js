define(['jquery',
        'logger',
        'collections/combat/characterCombatRoundStatisticCollection',
        'services/characterCombatRoundStatisticFactory',
        'services/playerWarehouse'],
    function ($, Logger, CombatRoundStatisticCollection, CombatRoundStatisticFactory, PlayerWarehouse) {

        // I am the first stop for getting combat rounds statistics.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CombatRoundStatisticWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'combatRoundStatisticCollection';

            // public functions

            this.getCombatRoundStatisticsForRound = function(combatRound) {
                var deferred = $.Deferred();

                $.when(getAllCombatRoundStatisticsForRound(combatRound)). then(
                    function(myCombatRoundStatisticCollection) {
                        if (PlayerWarehouse.getPlayerLoggedIn() && PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                            deferred.resolve(myCombatRoundStatisticCollection);
                        } else {
                            //means you're not an admin and therefore can not create stats - use non-syncing collection
                            //containing only the statistics for the logged in person.
                            var myStatsCollection = myCombatRoundStatisticCollection.forPlayer(PlayerWarehouse.getPlayerLoggedIn());
                            deferred.resolve(myStatsCollection);
                        }

                    }
                )

                return deferred.promise();
            };

            this.removeCombatRoundStatisticsForRound = function(combatRound) {
                var deferred = $.Deferred();
                $.when(getCombatRoundStatisticCollectionForRound(combatRound)).then(
                    function(myStatisticsCollection) {
                        var arrayOfRoundDeferred = [];
                        // right here, the collection is being changed - ones are deleted while others are processing
                        // make a new collection or array with the statistics models and then iterate through the array.
                        var modelArray = myStatisticsCollection.toArray();
                        modelArray.forEach(function(statisticsModel, index) {
                            arrayOfRoundDeferred.push(CombatRoundStatisticFactory.removeStatistic(statisticsModel));
                        });
                        // myStatisticsCollection.each(function(statisticsModel, index) {
                        //     arrayOfRoundDeferred.push(CombatRoundStatisticFactory.removeStatistic(statisticsModel));
                        // });
                        $.when.apply($, arrayOfRoundDeferred).then(function() {
                            deferred.resolve();
                        });
                    }
                )

                return deferred.promise();
            };

            // private functions
            getCombatRoundStatisticCollectionForRound = function(round) {
                var myKey = collectionKey + 'round:' + round.get('id');
                var deferred = $.Deferred();
                if (cache[myKey]) {
                    deferred.resolve(cache[myKey]);
                } else {
                    cache[myKey] = new CombatRoundStatisticCollection(null, {roundID : round.get('id'), encounterID : round.get('encounterID')});
                    cache[myKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            getAllCombatRoundStatisticsForRound = function(combatRound) {
                var deferred = $.Deferred();
                $.when(getCombatRoundStatisticCollectionForRound(combatRound)). then(
                    function(myCombatRoundStatisticCollection) {
                        if (! myCombatRoundStatisticCollection.hasAnyStatistics() ) {
                            $.when(CombatRoundStatisticFactory.createStatisticsForRound(combatRound, myCombatRoundStatisticCollection)). then(
                                function() {
                                    deferred.resolve(myCombatRoundStatisticCollection);
                                }
                            )
                        } else {
                            deferred.resolve(myCombatRoundStatisticCollection);
                        }
                    }
                )

                return deferred.promise();
            };

        };

        var myCombatRoundStatisticWarehouse = new CombatRoundStatisticWarehouse();

        return myCombatRoundStatisticWarehouse;

    });