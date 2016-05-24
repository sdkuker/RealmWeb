define(['backbone', 'backfire', 'models/player/playerModel', 'services/serviceConstants'],
    function (Backbone, Backfire, PlayerModel, ServiceConstants) {

        var PlayerListCollection = Backbone.Firebase.Collection.extend({
            model: PlayerModel,
          //  url: ServiceConstants.backFireBaseURL + '/players',
            url: firebase.database().ref('/players'),
            getAll: function() {
                return this.get('name');
            },
            comparator: function(player) {
                return player.get('name');
            }
        });

        return PlayerListCollection;

    });
