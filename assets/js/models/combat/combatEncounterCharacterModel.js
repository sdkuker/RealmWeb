define(['backbone'],
    function (Backbone) {

        var CombatEncounterCharacter = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                characterID : '',
                characterName: '',
                totalDefensiveBonus : 0,
                totalDefensiveBonusDescription : '',
                totalDefensiveBonusPlusParry : 0,
                totalDefensiveBonusPlusParryDescription : '',
                totalDefensiveBonusPlusAdrenalDefense : 0,
                totalDefensiveBonusPlusAdrenalDefenseDescription : '',
                totalDefensiveBonusPlusParryPlusAdrenalDefense : 0,
                totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription : '',
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
            getTotalDefensiveBonusPlusParryDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusParryDescription'));
            },
            setTotalDefensiveBonusPlusParryDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusParryDescription', encodeURI(aDescription));
            },
            getTotalDefensiveBonusPlusAdrenalDefenseDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusAdrenalDefenseDescription'));
            },
            setTotalDefensiveBonusPlusAdrenalDefenseDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusAdrenalDefenseDescription', encodeURI(aDescription));
            },
            getTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription'));
            },
            setTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription', encodeURI(aDescription));
            },

        });

        return CombatEncounterCharacter;

    });
