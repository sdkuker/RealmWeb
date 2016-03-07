define(['backbone'],
    function (Backbone) {

        var CharacterModel = Backbone.Model.extend({
            defaults: {
                name : '',
                playerID : '',
                observationSkill : 0,
                initiative : 0,
                initiativeModifier : 0,
                level : 0,
                armorType : 0,
                hasShield : false,
                hasAdrenalDefense : false,
                stalkSkill : 0,
                senseAmbushSkill : 0,
                alertnessSkill : 0,
                perception : 0,
                hitPoints : 0,
                hitPointsModifier : 0,
                will : 0,
                willModifier : 0,
                quicknessBonus : 0,
                racialModifier : 0,
                armorChoice : 0,
                armorOnArmor : 0,
                shieldChoice : 0,
                skillChoice1 : 0,
                skillChoice2 : 0,
                specialAbility : 0,
                miscItemChoice : 0,
                adrenalDefense : 0
            },
            totalDefensiveBonus: function() {
                return  this.get('quicknessBonus') +
                        this.get('racialModifier') +
                        this.get('armorChoice') +
                        this.get('armorOnArmor') +
                        this.get('shieldChoice') +
                        this.get('skillChoice1') +
                        this.get('skillChoice2') +
                        this.get('specialAbility') +
                        this.get('miscItemChoice') +
                        this.get('adrenalDefense');
            },
            totalDefensiveBonusMinusAdrenalDefense: function() {
                return  this.totalDefensiveBonus() - this.get('adrenalDefense');
            },
        });

        return CharacterModel;

    });
