define(['backbone'],
    function (Backbone) {

        var CombatEncounterCharacter = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                characterID : '',
                characterName: ''
            },
            getCharacterName: function() {
                return decodeURI(this.get('characterName'));
            },
        });

        return CombatEncounterCharacter;

    });
