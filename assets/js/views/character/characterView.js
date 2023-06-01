define(['marionette',
    'realmApplication',
    'models/character/characterModel',
    'utility/viewUtilities',
    "tpl!templates/character/characterTemplate.tpl",
    'logger',
    'services/characterWarehouse',
    'services/playerWarehouse'
], function (Marionette, RealmApplication, CharacterModel, ViewUtilities, CharacterTemplate, Logger,
             CharacterWarehouse, PlayerWarehouse) {
    var CharacterView = Marionette.ItemView.extend({
        template: CharacterTemplate,
        model: CharacterModel,
        chosenPlayer: null,
        attributeBeingEdited: null,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked',
            'click #cancelButton' : 'cancelButtonClicked'
        },
        initialize : function() {
            var self = this;
            //this.listenTo(this.model, 'change', this.render);
            $(document.body).on('change', '#playerSelect', function(e) {
                self.playerSelected();
            });
            $(document.body).on('change', '#shieldChoice', function(e) {
                self.checkEntryForBonusGroupA();
            });
            $(document.body).on('change', '#bracersBonus', function(e) {
                self.checkEntryForBonusGroupA();
            });
            $(document.body).on('change', '#ringBonus', function(e) {
                self.checkEntryForBonusGroupA();
            });
            $(document.body).on('change', '#magicalItemBonus', function(e) {
                self.checkEntryForBonusGroupA();
            });
            $(document.body).on('change', '#martialProwessBonus', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#terrainAwarenessBonus', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#zenMasterBonus', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#calisthenicsBonus', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#skillChoice1', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#skillChoice2', function(e) {
                self.checkEntryForBonusGroupB();
            });
            $(document.body).on('change', '#skillChoice3', function(e) {
                self.checkEntryForBonusGroupB();
            });
        },
        templateHelpers : function() {
            var characterName = this.model.getName();
            var myQuicknessBonusDescription = this.model.getQuicknessBonusDescription();
            var myRacialModifierDescription = this.model.getRacialModifierDescription();
            var myArmorChoiceDescription = this.model.getArmorChoiceDescription();
            var myArmorOnArmorDescription = this.model.getArmorOnArmorDescription();
            var myShieldChoiceDescription = this.model.getShieldChoiceDescription();

            var myBracersBonusDescription = this.model.getBracersBonusDescription();
            var myRingBonusDescription = this.model.getRingBonusDescription();
            var myMagicalItemBonusDescription = this.model.getMagicalItemBonusDescription();
            var myMartialProwessBonusDescription = this.model.getMartialProwessBonusDescription();
            var myTerrainAwarenessBonusDescription = this.model.getTerrainAwarenessBonusDescription();
            var myZenMasterBonusDescription = this.model.getZenMasterBonusDescription();
            var myCalisthenicsBonusDescription = this.model.getCalisthenicsBonusDescription();

            var mySkillChoice1Description = this.model.getSkillChoice1Description();
            var mySkillChoice2Description = this.model.getSkillChoice2Description();
            var mySkillChoice3Description = this.model.getSkillChoice3Description();
            var myMiscItemChoiceDescription = this.model.getMiscItemChoiceDescription();
            var myMiscItemChoice2Description = this.model.getMiscItemChoice2Description();
            var mySpecialAbilityDescription = this.model.getSpecialAbilityDescription();
            var myWeaponParryDescription = this.model.getWeaponParryDescription();
            var myAdrenalDefenseDescription = this.model.getAdrenalDefenseDescription();

            var myDefensiveBonusSubTotal = this.model.defensiveBonusSubtotal();
            var myDefensiveBonusSubTotalDescription = this.model.defensiveBonusSubtotalDescription();

            var myDefensiveBonusMultiplierDescription = this.model.getDefensiveBonusMultiplierDescription();

            var myTotalDefensiveBonus = this.model.totalDefensiveBonus();
            var myTotalDefensiveBonusDescription = this.model.totalDefensiveBonusDescription();
            var myTotalDefensiveBonusPlusParry = this.model.totalDefensiveBonusPlusParry();
            var myTotalDefensiveBonusPlusParryDescription = this.model.totalDefensiveBonusPlusParryDescription();
            var myTotalDefensiveBonusPlusAdrenalDefense = this.model.totalDefensiveBonusPlusAdrenalDefense();
            var myTotalDefensiveBonusPlusAdrenalDefenseDescription = this.model.totalDefensiveBonusPlusAdrenalDefenseDescription();
            var myTotalDefensiveBonusPlusParryPlusAdrenalDefense = this.model.totalDefensiveBonusPlusParryPlusAdrenalDefense();
            var myTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription = this.model.totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription();

            return {
                characterName : characterName,
                myQuicknessBonusDescription : myQuicknessBonusDescription,
                myRacialModifierDescription : myRacialModifierDescription,
                myArmorChoiceDescription : myArmorChoiceDescription,
                myArmorOnArmorDescription : myArmorOnArmorDescription,
                myShieldChoiceDescription : myShieldChoiceDescription,
                myBracersBonusDescription : myBracersBonusDescription,
                myRingBonusDescription : myRingBonusDescription,
                myMagicalItemBonusDescription : myMagicalItemBonusDescription,
                myMartialProwessBonusDescription : myMartialProwessBonusDescription,
                myTerrainAwarenessBonusDescription : myTerrainAwarenessBonusDescription,
                myZenMasterBonusDescription : myZenMasterBonusDescription,
                myCalisthenicsBonusDescription : myCalisthenicsBonusDescription,
                mySkillChoice1Description : mySkillChoice1Description,
                mySkillChoice2Description : mySkillChoice2Description,
                mySkillChoice3Description : mySkillChoice3Description,
                myMiscItemChoiceDescription : myMiscItemChoiceDescription,
                myMiscItemChoice2Description : myMiscItemChoice2Description,
                mySpecialAbilityDescription : mySpecialAbilityDescription,
                myWeaponParryDescription : myWeaponParryDescription,
                myAdrenalDefenseDescription : myAdrenalDefenseDescription,
                myDefensiveBonusSubTotal : myDefensiveBonusSubTotal,
                myDefensiveBonusSubTotalDescription : myDefensiveBonusSubTotalDescription,
                myDefensiveBonusMultiplierDescription : myDefensiveBonusMultiplierDescription,

                myTotalDefensiveBonus : myTotalDefensiveBonus,
                myTotalDefensiveBonusDescription : myTotalDefensiveBonusDescription,
                myTotalDefensiveBonusPlusParry : myTotalDefensiveBonusPlusParry,
                myTotalDefensiveBonusPlusParryDescription : myTotalDefensiveBonusPlusParryDescription,
                myTotalDefensiveBonusPlusAdrenalDefense : myTotalDefensiveBonusPlusAdrenalDefense,
                myTotalDefensiveBonusPlusAdrenalDefenseDescription : myTotalDefensiveBonusPlusAdrenalDefenseDescription,
                myTotalDefensiveBonusPlusParryPlusAdrenalDefense : myTotalDefensiveBonusPlusParryPlusAdrenalDefense,
                myTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription : myTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription,

            }
        },
        checkEntryForBonusGroupA : function() {
             self = this;
             let editPassed = true;
             let numberOfFieldsWithPositiveValues = 0;
             if (self.parseAsInt($('#shieldChoice').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (self.parseAsInt($('#bracersBonus').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (self.parseAsInt($('#ringBonus').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (self.parseAsInt($('#magicalItemBonus').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (numberOfFieldsWithPositiveValues > 1) {
                editPassed = false;
                ViewUtilities.showModalView('Warning', 'Can use only one of shield, bracers, ring and magical item bonuses. All others must have a value of zero.  You can use all the description fields though.');
             }
             return editPassed;
        },
        checkEntryForBonusGroupB : function() {
            self = this;
            let editPassed = true;
            let numberOfFieldsWithPositiveValues = 0;
            if (self.parseAsInt($('#martialProwessBonus').val()) > 0) {
               numberOfFieldsWithPositiveValues++;
            };
            if (self.parseAsInt($('#terrainAwarenessBonus').val()) > 0) {
               numberOfFieldsWithPositiveValues++;
            };
            if (self.parseAsInt($('#zenMasterBonus').val()) > 0) {
               numberOfFieldsWithPositiveValues++;
            };
            if (self.parseAsInt($('#calisthenicsBonus').val()) > 0) {
               numberOfFieldsWithPositiveValues++;
            };
            if (self.parseAsInt($('#skillChoice1').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (self.parseAsInt($('#skillChoice2').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
             if (self.parseAsInt($('#skillChoice3').val()) > 0) {
                numberOfFieldsWithPositiveValues++;
             };
            if (numberOfFieldsWithPositiveValues > 5) {
               editPassed = false;
               ViewUtilities.showModalView('Warning', 'Can use only up to five of martial prowess, terrian awareness, zen master, calisthenics, and the three skill bonuses. At least two must have a value of zero. You can use all the description fields though.');
            }
            return editPassed;
       },
        // events : {
        //     'input' : 'attributeValueChanged'
        // },
        // attributeValueChanged : function(event) {
        //     self = this;
        //     self.inputEvent = event;
        //     clearTimeout(this.timeout);
        //     this.timeout = setTimeout(function() {
        //         var targetID = self.inputEvent.target.getAttribute('id');
        //         this.attributeBeingEdited = targetID;
        //         var targetValueAsString = self.inputEvent.target.value.replace(/(<([^>]+)>)/ig,"");;
        //         var targetValue = parseInt(targetValueAsString);

        //         if (isNaN(targetValue)) {
        //             targetValue = 0;
        //         }
        //         var modelAttributeName = null;

        //         switch (targetID) {
        //             case 'quicknessBonus':
        //                 modelAttributeName = 'quicknessBonus';
        //                 break;
        //             case 'racialModifier':
        //                 modelAttributeName = 'racialModifier';
        //                 break;
        //             case 'armorChoice':
        //                 modelAttributeName = 'armorChoice';
        //                 break;
        //             case 'armorOnArmor':
        //                 modelAttributeName = 'armorOnArmor';
        //                 break;
        //             case 'shieldChoice':
        //                 modelAttributeName = 'shieldChoice';
        //                 break;
        //             case 'bracersBonus':
        //                 modelAttributeName = 'bracersBonus';
        //                 break;
        //             case 'ringBonus':
        //                 modelAttributeName = 'ringBonus';
        //                 break;
        //             case 'magicalItemBonus':
        //                 modelAttributeName = 'magicalItemBonus';
        //                 break;
        //             case 'martialProwessBonus':
        //                 modelAttributeName = 'martialProwessBonus';
        //                 break;
        //             case 'terrainAwarenessBonus':
        //                 modelAttributeName = 'terrainAwarenessBonus';
        //                 break;
        //             case 'zenMasterBonus':
        //                 modelAttributeName = 'zenMasterBonus';
        //                 break;
        //             case 'calisthenicsBonus':
        //                 modelAttributeName = 'calisthenicsBonus';
        //                 break;
        //             case 'skillChoice1':
        //                 modelAttributeName = 'skillChoice1';
        //                 break;
        //             case 'skillChoice2':
        //                 modelAttributeName = 'skillChoice2';
        //                 break;
        //             case 'skillChoice3':
        //                 modelAttributeName = 'skillChoice3';
        //                 break;
        //             case 'miscItemChoice':
        //                 modelAttributeName = 'miscItemChoice';
        //                 break;
        //             case 'miscItemChoice2':
        //                 modelAttributeName = 'miscItemChoice2';
        //                 break;
        //             case 'specialAbility':
        //                 modelAttributeName = 'specialAbility';
        //                 break;
        //             case 'weaponParry':
        //                 modelAttributeName = 'weaponParry';
        //                 break;
        //             case 'adrenalDefense':
        //                 modelAttributeName = 'adrenalDefense';
        //                 break;
        //         }
        //         if ( modelAttributeName ) {
        //             self.model.set(modelAttributeName, targetValue);
        //             self.render();
        //         }

        //     }, 1000);
        // },
        // onRender : function() {
        //     var self = this;
        //     if (this.attributeBeingEdited) {
        //         $(this.$el).find("[id='" + this.attributeBeingEdited + "']").focus();
        //     }
        // },
        populateModel : function() {
            var self = this;
            var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithName(self.getChosenPlayer());
            self.model.set('playerID', myPlayer.get('id'));
            self.model.setName($('#name').val());
            self.model.set('observationSkill', self.parseAsInt($('#observationSkill').val()));
            self.model.set('initiative', self.parseAsInt($('#initiative').val()));
            self.model.set('initiativeModifier', self.parseAsInt($('#initiativeModifier').val()));
            self.model.set('misc', self.parseAsInt($('#misc').val()));
            self.model.set('level', self.parseAsInt($('#level').val()));
            self.model.set('stalkSkill', self.parseAsInt($('#stalkSkill').val()));
            self.model.set('senseAmbushSkill', self.parseAsInt($('#senseAmbushSkill').val()));
            self.model.set('alertnessSkill', self.parseAsInt($('#alertnessSkill').val()));
            self.model.set('perception', self.parseAsInt($('#perception').val()));
            self.model.set('hitPoints', self.parseAsInt($('#hitPoints').val()));
            self.model.set('hitPointsModifier', self.parseAsInt($('#hitPointsModifier').val()));
            self.model.set('will', self.parseAsInt($('#will').val()));
            self.model.set('willModifier', self.parseAsInt($('#willModifier').val()));
            self.model.set('quicknessBonus', self.parseAsInt($('#quicknessBonus').val()));
            self.model.set('racialModifier', self.parseAsInt($('#racialModifier').val()));
            self.model.set('armorChoice', self.parseAsInt($('#armorChoice').val()));
            self.model.setQuicknessBonusDescription($('#quicknessBonusDescription').val());
            self.model.setRacialModifierDescription($('#racialModifierDescription').val());
            self.model.setAdrenalDefenseDescription($('#adrenalDefenseDescription').val());
            self.model.setArmorChoiceDescription($('#armorChoiceDescription').val());
            self.model.set('armorOnArmor', self.parseAsInt($('#armorOnArmor').val()));
            self.model.setArmorOnArmorDescription($('#armorOnArmorDescription').val());
            self.model.set('shieldChoice', self.parseAsInt($('#shieldChoice').val()));
            self.model.setShieldChoiceDescription($('#shieldChoiceDescription').val());

            self.model.set('bracersBonus', self.parseAsInt($('#bracersBonus').val()));
            self.model.setBracersBonusDescription($('#bracersBonusDescription').val());
            self.model.set('ringBonus', self.parseAsInt($('#ringBonus').val()));
            self.model.setRingBonusDescription($('#ringBonusDescription').val());
            self.model.set('magicalItemBonus', self.parseAsInt($('#magicalItemBonus').val()));
            self.model.setMagicalItemBonusDescription($('#magicalItemBonusDescription').val());
            self.model.set('martialProwessBonus', self.parseAsInt($('#martialProwessBonus').val()));
            self.model.setMartialProwessBonusDescription($('#martialProwessBonusDescription').val());
            self.model.set('terrainAwarenessBonus', self.parseAsInt($('#terrainAwarenessBonus').val()));
            self.model.setTerrainAwarenessBonusDescription($('#terrainAwarenessBonusDescription').val());
            self.model.set('zenMasterBonus', self.parseAsInt($('#zenMasterBonus').val()));
            self.model.setZenMasterBonusDescription($('#zenMasterBonusDescription').val());
            self.model.set('calisthenicsBonus', self.parseAsInt($('#calisthenicsBonus').val()));
            self.model.setCalisthenicsBonusDescription($('#calisthenicsBonusDescription').val());

            self.model.set('skillChoice1', self.parseAsInt($('#skillChoice1').val()));
            self.model.setSkillChoice1Description($('#skillChoice1Description').val());
            self.model.set('skillChoice2', self.parseAsInt($('#skillChoice2').val()));
            self.model.setSkillChoice2Description($('#skillChoice2Description').val());
            self.model.set('skillChoice3', self.parseAsInt($('#skillChoice3').val()));
            self.model.setSkillChoice3Description($('#skillChoice3Description').val());
            self.model.set('specialAbility', self.parseAsInt($('#specialAbility').val()));
            self.model.setSpecialAbilityDescription($('#specialAbilityDescription').val());
            self.model.set('miscItemChoice', self.parseAsInt($('#miscItemChoice').val()));
            self.model.setMiscItemChoiceDescription($('#miscItemChoiceDescription').val());
            self.model.set('miscItemChoice2', self.parseAsInt($('#miscItemChoice2').val()));
            self.model.setMiscItemChoice2Description($('#miscItemChoice2Description').val());
            self.model.set('adrenalDefense', self.parseAsInt($('#adrenalDefense').val()));
            self.model.set('weaponParry', self.parseAsInt($('#weaponParry').val()));
            self.model.setWeaponParryDescription($('#weaponParryDescription').val());

            self.model.set('defensiveBonusMultiplier', parseFloat($('#defensiveBonusMultiplier').val()));
            self.model.setDefensiveBonusMultiplierDescription($('#defensiveBonusMultiplierDescription').val());
        },
        parseAsInt : function(someValue) {
            var theReturn = 0;
            if (someValue) {
                if (! isNaN(someValue)) {
                    theReturn = parseInt(someValue);
                }
            }
            return theReturn;

        },
        createObjectWithAttributes : function() {
            var self = this;
            var tempObject = {};
            var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithName(self.getChosenPlayer());

            tempObject.playerID = myPlayer.get('id');
            tempObject.name = encodeURI($('#name').val());
            tempObject.observationSkill = self.parseAsInt($('#observationSkill').val());
            tempObject.initiative = self.parseAsInt($('#initiative').val());
            tempObject.initiativeModifier = self.parseAsInt($('#initiativeModifier').val());
            tempObject.misc = self.parseAsInt($('#misc').val());
            tempObject.level = self.parseAsInt($('#level').val());
            tempObject.stalkSkill = self.parseAsInt($('#stalkSkill').val());
            tempObject.senseAmbushSkill = self.parseAsInt($('#senseAmbushSkill').val());
            tempObject.alertnessSkill = self.parseAsInt($('#alertnessSkill').val());
            tempObject.perception = self.parseAsInt($('#perception').val());
            tempObject.hitPoints = self.parseAsInt($('#hitPoints').val());
            tempObject.hitPointsModifier = self.parseAsInt($('#hitPointsModifier').val());
            tempObject.will = self.parseAsInt($('#will').val());
            tempObject.willModifier = self.parseAsInt($('#willModifier').val());
            tempObject.quicknessBonus = self.parseAsInt($('#quicknessBonus').val());
            tempObject.racialModifier = self.parseAsInt($('#racialModifier').val());
            tempObject.armorChoice = self.parseAsInt($('#armorChoice').val());
            tempObject.armorChoiceDescription = encodeURI($('#armorChoiceDescription').val());
            tempObject.armorOnArmor = self.parseAsInt($('#armorOnArmor').val());
            tempObject.armorOnArmorDescription = encodeURI($('#armorOnArmorDescription').val());
            tempObject.shieldChoice = self.parseAsInt($('#shieldChoice').val());
            tempObject.shieldChoiceDescription = encodeURI($('#shieldChoiceDescription').val());
            tempObject.skillChoice1 = self.parseAsInt($('#skillChoice1').val());
            tempObject.skillChoice1Description = encodeURI($('#skillChoice1Description').val());
            tempObject.skillChoice2 = self.parseAsInt($('#skillChoice2').val());
            tempObject.skillChoice2Description = encodeURI($('#skillChoice2Description').val());
            tempObject.skillChoice3 = self.parseAsInt($('#skillChoice3').val());
            tempObject.skillChoice3Description = encodeURI($('#skillChoice3Description').val());
            tempObject.specialAbility = self.parseAsInt($('#specialAbility').val());
            tempObject.specialAbilityDescription = encodeURI($('#specialAbilityDescription').val());
            tempObject.miscItemChoice = self.parseAsInt($('#miscItemChoice').val());
            tempObject.miscItemChoiceDescription = encodeURI($('#miscItemChoiceDescription').val());
            tempObject.miscItemChoice2 = self.parseAsInt($('#miscItemChoice2').val());
            tempObject.miscItemChoice2Description = encodeURI($('#miscItemChoice2Description').val());
            tempObject.adrenalDefense = self.parseAsInt($('#adrenalDefense').val());
            tempObject.weaponParry = self.parseAsInt($('#weaponParry').val());
            tempObject.weaponParryDescription = encodeURI($('#weaponParryDescription').val());

            tempObject.bracersBonus = self.parseAsInt($('#bracersBonus').val());
            tempObject.bracersBonusDescription = encodeURI($('#bracersBonusDescription').val());
            tempObject.ringBonus = self.parseAsInt($('#ringBonus').val());
            tempObject.ringBonusDescription = encodeURI($('#ringBonusDescription').val());
            tempObject.magicalItemBonus = self.parseAsInt($('#magicalItemBonus').val());
            tempObject.magicalItemBonusDescription = encodeURI($('#magicalItemBonusDescription').val());
            tempObject.martialProwessBonus = self.parseAsInt($('#martialProwessBonus').val());
            tempObject.martialProwessBonusDescription = encodeURI($('#martialProwessBonusDescription').val());
            tempObject.terrainAwarenessBonus = self.parseAsInt($('#terrainAwarenessBonus').val());
            tempObject.terrainAwarenessBonusDescription = encodeURI($('#terrainAwarenessBonusDescription').val());
            tempObject.zenMasterBonus = self.parseAsInt($('#zenMasterBonus').val());
            tempObject.zenMasterBonusDescription = encodeURI($('#zenMasterBonusDescription').val());
            tempObject.calisthenicsBonus = self.parseAsInt($('#calisthenicsBonus').val());
            tempObject.calisthenicsBonusDescription = encodeURI($('#calisthenicsBonusDescription').val());

            tempObject.defensiveBonusMultiplier = parseFloat($('#defensiveBonusMultiplier').val());
            tempObject.defensiveBonusMultiplierDescription = encodeURI($('#defensiveBonusMultiplierDescription').val());

           return tempObject;
        },

        saveButtonClicked : function() {
            var self = this;
            if ( self.checkEntryForBonusGroupA() && self.checkEntryForBonusGroupB() ) {
                // if it's a new model, add it to the collection
                if (! self.model.get('id')) {
                    Logger.logInfo('About to add a new character model to the collection');
                    var tempObject = self.createObjectWithAttributes();
                    $.when(CharacterWarehouse.addCharacter(tempObject)).then(
                        function() {
                            ViewUtilities.showModalView('Informational', 'Character Saved');
                            // RealmApplication.vent.trigger('viewCharacterList');
                            self.render();
                        }
                    ),
                        function() {
                            console.log('some kind of error getting characters for addition of character');
                        }
                } else {
                    // don't have to do anything if it's modifying an existing model -
                    // just move the values to the exiting model.  firebase syncs automatically
                    self.populateModel();
                    ViewUtilities.showModalView('Informational', 'Character Saved');
                    // RealmApplication.vent.trigger('viewCharacterList');
                    self.render();
                }

            }
        },
        deleteButtonClicked : function() {
            this.model.destroy();
            Logger.logInfo('character model successfully deleted');
            ViewUtilities.showModalView('Informational', 'Character Deleted');
            RealmApplication.vent.trigger('viewCharacterList');
        },
        cancelButtonClicked : function() {
            RealmApplication.vent.trigger('viewCharacterList');
        },
        playerSelected : function() {
            self = this;
            self.chosenPlayer = $('#playerSelect option:selected').val();
        },
        getChosenPlayer : function() {
            if (self.chosenPlayer) {
                return self.chosenPlayer;
            } else {
                self.chosenPlayer = $('#playerSelect option:selected').val();
                return self.chosenPlayer;
            }
        },
        onRender : function() {
            self = this;
            var playerSelectElement = this.$el.find('#playerSelect');
            playerSelectElement.empty();
            var playerLoggedIn = PlayerWarehouse.getPlayerLoggedIn();
            $.when(PlayerWarehouse.getAllPlayers()).then(
                function(playerCollection) {
                    playerCollection.forEach(function(myPlayer, key, list) {
                        if (playerLoggedIn.get('administrator') || myPlayer.get('id') == playerLoggedIn.get('id')) {
                            var appendString = "<option value='" + myPlayer.getName() +  "'";
                            if ((key == 0 && ! self.getChosenPlayer()) || (self.getChosenPlayer() && self.getChosenPlayer() == myPlayer.getName())) {
                                appendString = appendString + " selected='selected'";
                                if (! self.getChosenPlayer()) {
                                    if (self.model.playerName()) {
                                        self.chosenPlayer = self.model.playerName();
                                    } else {
                                        self.chosenPlayer = myPlayer.getName();
                                    }
                                }
                            };
                            appendString = appendString + ">" + myPlayer.getName() + "</option>"
                            playerSelectElement.append(appendString);
                        }

                    });
                }
            )
        }
    });

    return CharacterView;

});
