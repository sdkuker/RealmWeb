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
                armorChoiceDescription : '',
                armorOnArmor : 0,
                armorOnArmorDescription : '',
                shieldChoice : 0,
                shieldChoiceDescription : '',
                skillChoice1 : 0,
                skillChoice1Description : '',
                skillChoice2 : 0,
                skillChoice2Description : '',
                skillChoice3 : 0,
                skillChoice3Description : '',
                specialAbility : 0,
                specialAbilityDescription : '',
                miscItemChoice : 0,
                miscItemChoiceDescription : '',
                adrenalDefense : 0,
                weaponParry : 0,
                weaponParryDescription : ''
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
            },
            getArmorChoiceDescription: function() {
                return decodeURI(this.get('armorChoiceDescription'));
            },
            setArmorChoiceDescription: function(aDescription) {
                return this.set('armorChoiceDescription', encodeURI(aDescription));
            },
            getArmorOnArmorDescription: function() {
                return decodeURI(this.get('armorOnArmorDescription'));
            },
            setArmorOnArmorDescription: function(aDescription) {
                return this.set('armorOnArmorDescription', encodeURI(aDescription));
            },
            getShieldChoiceDescription: function() {
                return decodeURI(this.get('shieldChoiceDescription'));
            },
            setShieldChoiceDescription: function(aDescription) {
                return this.set('shieldChoiceDescription', encodeURI(aDescription));
            },
            getSkillChoice1Description: function() {
                return decodeURI(this.get('skillChoice1Description'));
            },
            setSkillChoice1Description: function(aDescription) {
                return this.set('skillChoice1Description', encodeURI(aDescription));
            },
            getSkillChoice2Description: function() {
                return decodeURI(this.get('skillChoice2Description'));
            },
            setSkillChoice2Description: function(aDescription) {
                return this.set('skillChoice2Description', encodeURI(aDescription));
            },
            getSkillChoice3Description: function() {
                return decodeURI(this.get('skillChoice3Description'));
            },
            setSkillChoice3Description: function(aDescription) {
                return this.set('skillChoice3Description', encodeURI(aDescription));
            },
            getSpecialAbilityDescription: function() {
                return decodeURI(this.get('specialAbilityDescription'));
            },
            setSpecialAbilityDescription: function(aDescription) {
                return this.set('specialAbilityDescription', encodeURI(aDescription));
            },
            getMiscItemChoiceDescription: function() {
                return decodeURI(this.get('miscItemChoiceDescription'));
            },
            setMiscItemChoiceDescription: function(aDescription) {
                return this.set('miscItemChoiceDescription', encodeURI(aDescription));
            },
            getWeaponParryDescription: function() {
                return decodeURI(this.get('weaponParryDescription'));
            },
            setWeaponParryDescription: function(aDescription) {
                return this.set('weaponParryDescription', encodeURI(aDescription));
            }
        });

        return CharacterModel;

    });
