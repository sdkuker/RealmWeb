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
    var PlayerView = Marionette.ItemView.extend({
        template: CharacterTemplate,
        model: CharacterModel,
        chosenPlayer: null,
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
        },
        templateHelpers : function() {
            var characterName = this.model.getName();
            return {
                characterName : characterName
            }
        },
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
            self.model.set('armorOnArmor', self.parseAsInt($('#armorOnArmor').val()));
            self.model.set('shieldChoice', self.parseAsInt($('#shieldChoice').val()));
            self.model.set('skillChoice1', self.parseAsInt($('#skillChoice1').val()));
            self.model.set('skillChoice2', self.parseAsInt($('#skillChoice2').val()));
            self.model.set('skillChoice3', self.parseAsInt($('#skillChoice3').val()));
            self.model.set('specialAbility', self.parseAsInt($('#specialAbility').val()));
            self.model.set('miscItemChoice', self.parseAsInt($('#miscItemChoice').val()));
            self.model.set('adrenalDefense', self.parseAsInt($('#adrenalDefense').val()));
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
            tempObject.armorOnArmor = self.parseAsInt($('#armorOnArmor').val());
            tempObject.shieldChoice = self.parseAsInt($('#shieldChoice').val());
            tempObject.skillChoice1 = self.parseAsInt($('#skillChoice1').val());
            tempObject.skillChoice2 = self.parseAsInt($('#skillChoice2').val());
            tempObject.skillChoice3 = self.parseAsInt($('#skillChoice3').val());
            tempObject.specialAbility = self.parseAsInt($('#specialAbility').val());
            tempObject.miscItemChoice = self.parseAsInt($('#miscItemChoice').val());
            tempObject.adrenalDefense = self.parseAsInt($('#adrenalDefense').val());

           return tempObject;
        },

        saveButtonClicked : function() {
            var self = this;
            // if it's a new model, add it to the collection
            if (! self.model.get('id')) {
                Logger.logInfo('About to add a new character model to the collection');
                var tempObject = self.createObjectWithAttributes();
                $.when(CharacterWarehouse.addCharacter(tempObject)).then(
                    function() {
                        ViewUtilities.showModalView('Informational', 'Character Saved');
                        RealmApplication.vent.trigger('viewCharacterList');
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
                RealmApplication.vent.trigger('viewCharacterList');
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

    return PlayerView;

});
