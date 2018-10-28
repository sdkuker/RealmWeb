define(['jquery',
        'logger',
        'collections/willContestConsequenceMaintenance/willContestConsequenceCollection'],
    function ($, Logger, ConsequenceCollection) {

        // I am the first stop for getting will contest consequences.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        WillContestConsequenceWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var allConsequencesCollectionKey = 'allConsequencesCollectionKey';

            // public functions

            this.getAllWillContestConsequences = function() {
                var deferred = $.Deferred();
                if (cache[allConsequencesCollectionKey]) {
                    deferred.resolve(cache[allConsequencesCollectionKey]);
                } else {
                    cache[allConsequencesCollectionKey] = new ConsequenceCollection(null, {orderByMinimumRollValue : true});
                    cache[allConsequencesCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.getAllWillContestConsequencesWithDefaultForAdd = function() {
                var deferred = $.Deferred();
                var cacheKey = allConsequencesCollectionKey + ':withDefault';
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    var defaultConsequence = {};
                    defaultConsequence['description'] = 'Add New Consequence On This Row';
                    defaultConsequence['minimumRollValue'] = -10000;
                    defaultConsequence['maximumRollValue'] = 0;
                    defaultConsequence['permanentBonus'] = 0;
                    defaultConsequence['temporaryBonus'] = 0;
                    defaultConsequence['durationInRoundsOfTemporaryBonus'] = 0;

                    cache[cacheKey] = new ConsequenceCollection(defaultConsequence, {orderByMinimumRollValue : true});
                    cache[cacheKey].on('sync', function(collection) {
                        deferred.resolve(cache[cacheKey]);
                    })
                }

                return deferred.promise();
            };

            this.getConsequence = function(aConsequenceValue) {
                var deferred = $.Deferred();
                $.when(self.getAllWillContestConsequences()).then(
                    function(willContestConsequenceCollection) {
                        var arrayOfChosenConsequence = willContestConsequenceCollection.filter(function (aConsequence) {
                            return  aConsequenceValue >= parseInt(aConsequence.get('minimumRollValue')) &&
                                    aConsequenceValue <= parseInt(aConsequence.get('maximumRollValue'));
                        })
                        if (arrayOfChosenConsequence && arrayOfChosenConsequence.length === 1) {
                            deferred.resolve(arrayOfChosenConsequence[0]);
                        } else {
                            deferred.reject('unable to find a consequence for value: ' + aConsequenceValue);
                        }
                    }
                )
                return deferred.promise();
            };

            this.addWillContestConsequence = function(consequenceAttributes) {
                var deferred = $.Deferred();

                $.when(getAllWillContestConsequencesUnordered()).then (
                    function(allConsequencesCollection) {
                        allConsequencesCollection.add(consequenceAttributes);
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            };

            this.removeWillContestConsequence = function(aConsequence) {
                var deferred = $.Deferred();
                var myConsequence = aConsequence;
                $.when(getAllWillContestConsequencesUnordered()).then (
                    function(allCondequencesCollection) {
                        allCondequencesCollection.remove(myConsequence)
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            };
            // private functions

            getAllWillContestConsequencesUnordered = function() {
                var deferred = $.Deferred();
                var cacheKey = allConsequencesCollectionKey + ':unordered';
                if (cache[allConsequencesCollectionKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    cache[cacheKey] = new ConsequenceCollection(null, {orderByMinimumRollValue : false});
                    cache[cacheKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };


        var myWillContestConsequenceWarehouse = new WillContestConsequenceWarehouse();

        return myWillContestConsequenceWarehouse;

    });