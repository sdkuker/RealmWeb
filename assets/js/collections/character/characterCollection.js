define(['backbone', 'firebase', 'backfire', 'models/character/characterModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CharacterModel, ServiceConstants) {

        var CharacterCollection = Backbone.Firebase.Collection.extend({
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/characters/');
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
