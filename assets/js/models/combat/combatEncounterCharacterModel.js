define(['backbone'],
    function (Backbone) {

        var CombatEncounterCharacter = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                characterID : '',
                characterName: ''
            },

        });

        return CombatEncounterCharacter;

    });
