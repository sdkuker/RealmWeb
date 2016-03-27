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
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            var self = this;
            //this.listenTo(this.model, 'change', this.render);
            $(document.body).on('change', '#playerSelect', function(e) {
                self.playerSelected();
            });
        },
        populateModel : function() {
            var self = this;
            var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithName(self.chosenPlayer);
            self.model.set('playerID', parseInt(myPlayer.get('id')));
            self.model.set('name', parseInt(encodeURI($('#name').val())));
            self.model.set('observationSkill', parseInt($('#observationSkill').val()));
            self.model.set('initiative', parseInt($('#initiative').val()));
            self.model.set('initiativeModifier', parseInt($('#initiativeModifier').val()));
            self.model.set('misc', parseInt($('#misc').val()));
            self.model.set('level', parseInt($('#level').val()));
            self.model.set('stalkSkill', parseInt($('#stalkSkill').val()));
            self.model.set('senseAmbushSkill', parseInt($('#senseAmbushSkill').val()));
            self.model.set('alertnessSkill', parseInt($('#alertnessSkill').val()));
            self.model.set('perception', parseInt($('#perception').val()));
            self.model.set('hitPoints', parseInt($('#hitPoints').val()));
            self.model.set('hitPointsModifier', parseInt($('#hitPointsModifier').val()));
            self.model.set('will', parseInt($('#will').val()));
            self.model.set('willModifier', parseInt($('#willModifier').val()));
            self.model.set('quicknessBonus', parseInt($('#quicknessBonus').val()));
            self.model.set('racialModifier', parseInt($('#racialModifier').val()));
            self.model.set('armorChoice', parseInt($('#armorChoice').val()));
            self.model.set('armorOnArmor', parseInt($('#armorOnArmor').val()));
            self.model.set('shieldChoice', parseInt($('#shieldChoice').val()));
            self.model.set('skillChoice1', parseInt($('#skillChoice1').val()));
            self.model.set('skillChoice2', parseInt($('#skillChoice2').val()));
            self.model.set('specialAbility', parseInt($('#specialAbility').val()));
            self.model.set('miscItemChoice', parseInt($('#miscItemChoice').val()));
            self.model.set('adrenalDefense', parseInt($('#adrenalDefense').val()));
        },
        createObjectWithAttributes : function() {
            var self = this;
            var tempObject = {};
            var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithName(self.chosenPlayer);

            tempObject.playerID = myPlayer.get('id');
            tempObject.name = encodeURI($('#name').val());
            tempObject.observationSkill = parseInt($('#observationSkill').val());
            tempObject.initiative = parseInt($('#initiative').val());
            tempObject.initiativeModifier = parseInt($('#initiativeModifier').val());
            tempObject.misc = parseInt($('#misc').val());
            tempObject.level = parseInt($('#level').val());
            tempObject.stalkSkill = parseInt($('#stalkSkill').val());
            tempObject.senseAmbushSkill = parseInt($('#senseAmbushSkill').val());
            tempObject.alertnessSkill = parseInt($('#alertnessSkill').val());
            tempObject.perception = parseInt($('#perception').val());
            tempObject.hitPoints = parseInt($('#hitPoints').val());
            tempObject.hitPointsModifier = parseInt($('#hitPointsModifier').val());
            tempObject.will = parseInt($('#will').val());
            tempObject.willModifier = parseInt($('#willModifier').val());
            tempObject.quicknessBonus = parseInt($('#quicknessBonus').val());
            tempObject.racialModifier = parseInt($('#racialModifier').val());
            tempObject.armorChoice = parseInt($('#armorChoice').val());
            tempObject.armorOnArmor = parseInt($('#armorOnArmor').val());
            tempObject.shieldChoice = parseInt($('#shieldChoice').val());
            tempObject.skillChoice1 = parseInt($('#skillChoice1').val());
            tempObject.skillChoice2 = parseInt($('#skillChoice2').val());
            tempObject.specialAbility = parseInt($('#specialAbility').val());
            tempObject.miscItemChoice = parseInt($('#miscItemChoice').val());
            tempObject.adrenalDefense = parseInt($('#adrenalDefense').val());

           return tempObject;
        },

        saveButtonClicked : function() {
            var self = this;
            // if it's a new model, add it to the collection
            if (! self.model.get('id')) {
                Logger.logInfo('About to add a new character model to the collection');
                var tempObject = self.createObjectWithAttributes();
                $.when(CharacterWarehouse.getAllCharacters()).then(
                    function(myCharacterCollection) {
                        myCharacterCollection.add(tempObject);
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
            this.model.destroy().then(
                function(characterModel) {
                    Logger.logInfo('character model successfully saved');
                    ViewUtilities.showModalView('Informational', 'Character Saved');
                    RealmApplication.vent.trigger('viewCharacterList');
                },
                function(error) {
                    Logger.logErrror("character model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Saving the Character.  See the log');
                }
            );
        },
        playerSelected : function() {
            self = this;
            self.chosenPlayer = $('#playerSelect option:selected').val();
        },
        onRender : function() {
            self = this;
            var playerSelectElement = this.$el.find('#playerSelect');
            playerSelectElement.empty();
            $.when(PlayerWarehouse.getAllPlayers()).then(
                function(playerCollection) {
                    playerCollection.forEach(function(myPlayer, key, list) {
                        var appendString = "<option value='" + myPlayer.getName() +  "'";
                        if ((key == 0 && ! self.chosenPlayer) || (self.chosenPlayer && self.chosenPlayer == myPlayer.getName())) {
                            appendString = appendString + " selected='selected'";
                            if (! self.chosenPlayer) {
                                self.chosenPlayer = myPlayer.getName();
                            }
                        };
                        appendString = appendString + ">" + myPlayer.getName() + "</option>"
                        playerSelectElement.append(appendString);
                    });
                }
            )
        }
    });

    return PlayerView;

});
