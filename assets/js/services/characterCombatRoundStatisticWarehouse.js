define(['jquery',
        'logger',
        'collections/combat/characterCombatRoundStatisticCollection',
        'services/characterCombatRoundStatisticFactory'],
    function ($, Logger, CombatRoundStatisticCollection, CombatRoundStatisticFactory) {

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

            // private functions
            getCombatRoundStatisticCollectionForRound = function(round) {
                var myKey = collectionKey + 'round:' + round.get('id');
                var deferred = $.Deferred();
                if (cache[myKey]) {
                    deferred.resolve(cache[myKey]);
                } else {
                    cache[myKey] = new CombatRoundStatisticCollection({}, {roundID : round.get('id'), encounterID : round.get('encounterID')});
                    cache[myKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };

        var myCombatRoundStatisticWarehouse = new CombatRoundStatisticWarehouse();

        return myCombatRoundStatisticWarehouse;

    });