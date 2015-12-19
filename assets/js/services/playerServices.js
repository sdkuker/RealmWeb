define(['parse',
    'models/player/playerModel',
    'collections/player/playerCollection'],
    function (Parse, PlayerModel, PlayerCollection) {

        PlayerServices = function() {
            // all variables are private
            var self = this;

            // putlic functions
            this.getAllPlayers = function() {
                var myPlayerCollection = new PlayerCollection();
                myPlayerCollection.fetch().then(
                    function(results)  {
                        console.log('got results');
                        for (var index = 0; index < results.length; index++){
                            myPlayerCollection.add(results[index]);
                        }
                    },
                    function(error) {
                        console.log('got an error' + error.code + ' ' + error.message);
                    }

                );
                return myPlayerCollection;
            }
        };

        var myPlayerServices = new PlayerServices();

        return myPlayerServices;

    });