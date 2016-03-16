define(['jquery',
        'logger',
        'collections/player/playerCollection'],
    function ($, Logger, PlayerCollection) {

        // I am the first stop for getting players.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        PlayerWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'playterCollection';

            // public functions
            this.getAllPlayers = function() {
                var deferred = $.Deferred();
                $.when(getPlayerCollection()).then(
                    function(myPlayerCollection) {
                        deferred.resolve(myPlayerCollection);
                    }
                )
                return deferred.promise();
            };

            this.getPlayerWithID = function(playerID) {
                var deferred = $.Deferred();
                $.when(getPlayerCollection()). then(
                    function(playerCollection) {
                        deferred.resolve(playerCollection.get(playerID));
                    }
                )

                return deferred.promise();
            };

            this.getPlayerWithoutWaitingWithID = function(playerID) {
                if (cache[collectionKey]) {
                    return cache[collectionKey].get(playerID);
                } else {
                    return 'not available';
                }
            };
            this.getPlayerWithName = function(playerName) {
                var deferred = $.Deferred();
                $.when(getPlayerCollection()). then(
                    function(playerCollection) {
                        deferred.resolve(playerCollection.findWhere({name: playerName}));
                    }
                )

                return deferred.promise();
            };

            // private functions
            getPlayerCollection = function() {
                var deferred = $.Deferred();
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new PlayerCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            }
        };

        var myPlayerWarehouse = new PlayerWarehouse();

        return myPlayerWarehouse;

    });