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
                    cache[allConsequencesCollectionKey] = new ConsequenceCollection();
                    cache[allConsequencesCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };

        var myWillContestConsequenceWarehouse = new WillContestConsequenceWarehouse();

        return myWillContestConsequenceWarehouse;

    });