define(['backbone', 'parse', 'models/player/playerModel'],
    function (Backbone, Parse, PlayerModel) {

        var PlayerListCollection = Backbone.Collection.extend({
            _parse_class_name : 'Player',
            model: PlayerModel,
            getAll: function() {
                return this.get('name');
            },
            comparator: function(player) {
                return player.get('name');
            }
        });

        return PlayerListCollection;

    });
