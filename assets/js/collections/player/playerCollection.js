define(['backbone', 'firebase', 'backfire', 'models/player/playerModel'],
    function (Backbone, Firebase, Backfire, PlayerModel) {

        var PlayerListCollection = Backbone.Firebase.Collection.extend({
            model: PlayerModel,
            url: 'https://stevieware.firebaseio.com',
            getAll: function() {
                return this.get('name');
            },
            comparator: function(player) {
                return player.get('name');
            }
        });

        return PlayerListCollection;

    });
