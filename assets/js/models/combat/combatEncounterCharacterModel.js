define(['backbone'],
    function (Backbone) {

        var CombatEncounterCharacter = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                characterID : '',
                characterName: '',
                totalDefensiveBonus : 0,
                totalDefensiveBonusDescription : '',
                totalDefensiveBonusMinusAdrenalDefense : 0,
                totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry : 0,
                activeInEncounter: false,
                numberInCombat : 1
            },
            getCharacterName: function() {
                return decodeURI(this.get('characterName'));
            },
            getTotalDefensiveBonusDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusDescription'));
            },
            setTotalDefensiveBonusDescription: function(aDescription) {
                return this.set('totalDefensiveBonusDescription', encodeURI(aDescription));
            },
        });

        return CombatEncounterCharacter;

    });
