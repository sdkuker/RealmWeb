define(['backbone', 'firebase', 'backfire', 'models/player/playerModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, PlayerModel, ServiceConstants, Config) {

        var PlayerListCollection = Backbone.Firebase.Collection.extend({
            model: PlayerModel,
            url: ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/players',
            getAll: function() {
                return this.get('name');
            },
            comparator: function(player) {
                return player.get('name');
            }
        });

        return PlayerListCollection;

    });
