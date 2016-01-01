define(['jquery', 'parse', 'logger',
    'collections/player/playerCollection'],
    function ($, Parse, Logger, PlayerCollection) {

        PlayerServices = function() {
            // all variables are private
            var self = this;

            // putlic functions
            this.getAllPlayers = function() {
                var myPlayerCollection = new PlayerCollection();
                var deferred = $.Deferred();
                $.when(myPlayerCollection.fetch()).then(
                    function(results)  {
                        Logger.logInfo('got player list from Parse');
                        for (var index = 0; index < results.length; index++){
                            myPlayerCollection.add(results[index]);
                        };
                        deferred.resolve(myPlayerCollection);
                    },
                    function(error) {
                        var errorString = 'got error getting all players from Parse: ' + error.code + ' ' + error.message;
                        Logger.logErrror(errorString);
                        deferred.reject(errorString);
                    }

                );
                return deferred.promise();
            }
        };

        var myPlayerServices = new PlayerServices();

        return myPlayerServices;

    });