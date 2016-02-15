define(['backbone', 'firebase', 'backfire', 'models/player/playerModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, PlayerModel, ServiceConstants) {

        var PlayerListCollection = Backbone.Firebase.Collection.extend({
            model: PlayerModel,
            url: ServiceConstants.backFireBaseURL + '/players',
            getAll: function() {
                return this.get('name');
            },
            comparator: function(player) {
                return player.get('name');
            }
        });

        return PlayerListCollection;

    });
