define(['backbone', 'firebase', 'backfire', 'models/character/characterModel',
        'services/serviceConstants', 'config', 'services/playerWarehouse'],
    function (Backbone, Firebase, Backfire, CharacterModel, ServiceConstants, Config, PlayerWarehouse) {

        var CharacterCollection = Backbone.Firebase.Collection.extend({
            url: function() {
                if (PlayerWarehouse && PlayerWarehouse.getPlayerLoggedIn() && PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/characters/');
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment +
                        '/characters?orderBy=\"playerID\"&equalTo=' + PlayerWarehouse.getPlayerLoggedIn().get('id'));
                }

            },
            model: CharacterModel,
            comparator: function(character) {
                return character.get('name');
            },
            parse : function(response, options) {
                console.log("i'm here too.");
            }
        });

        return CharacterCollection;

    });
