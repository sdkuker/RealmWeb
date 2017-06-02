define(['realmApplication',
        'jquery',
        'logger',
        'collections/player/playerCollection'],
    function (RealmApplication, $, Logger, PlayerCollection) {

        // I am the first stop for getting players.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        PlayerWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'playterCollection';
            var playerLoggedIn = null;

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

            this.getPlayerLoggedIn = function() {
                return self.playerLoggedIn;
            };

            this.setPlayerLoggedIn = function(aPlayerModel) {
                var deferred = $.Deferred();

                $.when(this.getPlayerWithID(aPlayerModel.get('id'))).then(
                    function(existingPlayer) {
                        if (existingPlayer) {
                            self.playerLoggedIn = existingPlayer;
                            deferred.resolve(self.playerLoggedIn);
                        } else {
                            $.when(getPlayerCollection()).then(
                                function(allPlayersCollection) {
                                    var newPlayerObject = {name : aPlayerModel.get('name'),
                                        id : aPlayerModel.get('id')};
                                    allPlayersCollection.add(newPlayerObject);
                                    self.playerLoggedIn = aPlayerModel;
                                    deferred.resolve(self.playerLoggedIn);
                                }
                            )
                        }
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

            this.getPlayerWithoutWaitingWithName = function(playerName) {
                if (cache[collectionKey]) {
                    return cache[collectionKey].findWhere({name: playerName});
                } else {
                    return 'not available';
                }
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
            };

        };

        var myPlayerWarehouse = new PlayerWarehouse();

        return myPlayerWarehouse;

    });