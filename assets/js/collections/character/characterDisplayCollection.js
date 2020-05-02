define(['backbone', 'models/character/characterModel'],
    function (Backbone, CharacterModel) {

        var CharacterDisplayCollection = Backbone.Collection.extend({
            model: CharacterModel,
            comparator: function(character) {
                return character.get('name');
            },
        });

        return CharacterDisplayCollection;

    });
