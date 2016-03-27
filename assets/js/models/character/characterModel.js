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
                specialAbility : 0,
                miscItemChoice : 0,
                adrenalDefense : 0
            },
            parse : function(response, options) {
                console.log('here I am');
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
            playerName : function() {
                var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithID(this.get('playerID'));
                if (myPlayer) {
                    return myPlayer.getName();
                } else {
                    return 'unknown';
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
