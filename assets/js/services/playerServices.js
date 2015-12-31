define(['parse',
        'logger',
    'collections/player/playerCollection'],
    function (Parse, Logger, PlayerCollection) {

        PlayerServices = function() {
            // all variables are private
            var self = this;

            // putlic functions
            this.getAllPlayers = function() {
                var myPlayerCollection = new PlayerCollection();
                myPlayerCollection.fetch().then(
                    function(results)  {
                        Logger.logInfo('got player list from Parse');
                        for (var index = 0; index < results.length; index++){
                            myPlayerCollection.add(results[index]);
                        }
                    },
                    function(error) {
                        Logger.logErrror('got error getting all players from Parse: ' + error.code + ' ' + error.message)
                    }

                );
                return myPlayerCollection;
            }
        };

        var myPlayerServices = new PlayerServices();

        return myPlayerServices;

    });