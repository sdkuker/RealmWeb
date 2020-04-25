define(['backbone'],
    function (Backbone) {

        var CombatEncounterCharacter = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                characterID : '',
                characterName: '',
                activeInEncounter: false
            },
            getCharacterName: function() {
                return decodeURI(this.get('characterName'));
            },
        });

        return CombatEncounterCharacter;

    });
