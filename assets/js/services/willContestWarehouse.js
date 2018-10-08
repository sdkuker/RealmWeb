define(['jquery',
        'logger',
        'collections/willContest/willContestCollection',
        'services/itemWarehouse',
        'services/characterWarehouse'],
    function ($, Logger, WillContestCollection, ItemWarehouse, CharacterWarehouse) {

        // I am the first stop for getting will contests.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        WillContestWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var allContestsCollectionKey = 'allContestsCollectionKey';

            // public functions

            this.getAllWillContestants = function() {
                var deferred = $.Deferred();
                $.when(ItemWarehouse.getAllItems(), CharacterWarehouse.getAllCharacters()).then (
                    function(allItemsCollection, allCharactersCollection) {
                        var allContestants = [];
                        allItemsCollection.each(function(model, index, list) {
                            allContestants.push({name: model.get('name'),
                                will: model.get('will'),
                                willModifier: model.get('willModifier'),
                                id: model.get('id')});
                        });
                        allCharactersCollection.each(function(model, index, list) {
                            allContestants.push({name: decodeURI(model.get('name')),
                                will: model.get('will'),
                                willModifier: model.get('willModifier'),
                                id: model.get('id')});
                        });

                        deferred.resolve(allContestants);
                    }
                )

                return deferred.promise();
            };

            this.getAllWillContests = function() {
                var deferred = $.Deferred();
                if (cache[allContestsCollectionKey]) {
                    deferred.resolve(cache[allContestsCollectionKey]);
                } else {
                    cache[allContestsCollectionKey] = new WillContestCollection();
                    cache[allContestsCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.addWillContest = function(contestAttributes) {
                var deferred = $.Deferred();

                $.when(getAllWillContestsUnordered()).then (
                    function(allContestsCollection) {
                        allContestsCollection.add(contestAttributes);
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            };

            this.removeWillContest = function(aContest) {
                var deferred = $.Deferred();
                var myContest = aContest;
                $.when(getAllWillContestsUnordered()).then (
                    function(allContestsCollection) {
                        allContestsCollection.remove(myConsequence)
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            },
                // private functions

                getAllWillContestsUnordered = function() {
                    var deferred = $.Deferred();
                    var cacheKey = allContestsCollectionKey + ':unordered';
                    if (cache[cacheKey]) {
                        deferred.resolve(cache[cacheKey]);
                    } else {
                        cache[cacheKey] = new WillContestCollection(null, {orderByMinimumRollValue : false});
                        cache[cacheKey].on('sync',function(collection) {
                            deferred.resolve(collection);
                        })
                    }
                    return deferred.promise();
                };

        };


        var myWillContestWarehouse = new WillContestWarehouse();

        return myWillContestWarehouse;

    });