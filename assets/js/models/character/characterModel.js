define(['backbone', 'services/playerWarehouse'],
    function (Backbone, PlayerWarehouse) {

        var CharacterModel = Backbone.Model.extend({
            defaults: {
                name : '',
                playerID : '',
                observationSkill : 0,
                initiative : 0,
                initiativeModifier : 0,
                misc : 0,
                level : 0,
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
                skillChoice3 : 0,
                specialAbility : 0,
                miscItemChoice : 0,
                adrenalDefense : 0,
                weaponParry : 0
            },
            totalWill : function() {
                return this.get('will') + this.get('willModifier');
            },
            totalHitPoints : function() {
                return this.get('hitPoints') + this.get('hitPointsModifier');
            },
            totalDefensiveBonus: function() {
                return  this.get('quicknessBonus') +
                        this.get('racialModifier') +
                        this.get('armorChoice') +
                        this.get('armorOnArmor') +
                        this.get('shieldChoice') +
                        this.get('skillChoice1') +
                        this.get('skillChoice2') +
                        this.get('skillChoice3') +
                        this.get('specialAbility') +
                        this.get('miscItemChoice') +
                        this.get('weaponParry') +
                        this.get('adrenalDefense');
            },
            totalDefensiveBonusDescription: function() {
                return  "Quickness Bonus(" + this.get('quicknessBonus') + ") + " +
                        "Racial Modifier(" + this.get('racialModifier') + ") + " +
                        "Armour Choice(" + this.get('armorChoice') + ") + " +
                        "Armor on Armor(" + this.get('armorOnArmor') + ") + " +
                        "Shield Choice(" + this.get('shieldChoice') + ") + " +
                        "Skill Choice 1(" + this.get('skillChoice1') + ") + " +
                        "Skill Choice 2(" + this.get('skillChoice2') + ") + " +
                        "Skill Choice 3(" + this.get('skillChoice3') + ") + " +
                        "Special Ability(" + this.get('specialAbility') + ") + " +
                        "Misc Item Choice(" + this.get('miscItemChoice') + ") + " +
                        "Weapon Parry(" + this.get('weaponParry') + ") + " +
                        "Adrenal Defense(" + this.get('adrenalDefense') + ") = " +
                        this.totalDefensiveBonus();
            },
            totalDefensiveBonusMinusAdrenalDefense: function() {
                return  this.totalDefensiveBonus() - this.get('adrenalDefense');
            },
            totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry: function() {
                return  this.totalDefensiveBonus() - this.get('adrenalDefense')  - this.get('weaponParry');
            },
            getName: function() {
                return decodeURI(this.get('name'));
            },
            setName: function(aName) {
                return this.set('name', encodeURI(aName));
            },
            playerName : function() {
                var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithID(this.get('playerID'));
                if (myPlayer) {
                    return myPlayer.getName();
                } else {
                    return null;
                }
            },
            hasAdrenalDefense : function() {
                return this.get('adrenalDefense') > 0;
            },
            hasShield : function() {
                return this.get('shieldChoice') > 0;
            }
        });

        return CharacterModel;

    });
