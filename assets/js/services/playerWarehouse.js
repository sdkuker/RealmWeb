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

            // public functions
            this.getAllPlayers = function() {
                var deferred = $.Deferred();
                var collectionKey = 'playerCollection';
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new PlayerCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myPlayerWarehouse = new PlayerWarehouse();

        return myPlayerWarehouse;

    });