define(['backbone', 'backfire', 'models/character/characterModel', 'services/serviceConstants'],
    function (Backbone, Backfire, CharacterModel, ServiceConstants) {

        var CharacterCollection = Backbone.Firebase.Collection.extend({
            url: function() {
               // return new Firebase(ServiceConstants.backFireBaseURL + '/characters/');
                return firebase.database().ref('/characters/');
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
