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
            $.when(PlayerWarehouse.getPlayerWithName(self.chosenPlayer)).then(
                function(myPlayer) {
                    self.model.set('playerID', myPlayer.get('id'));
                    self.model.set('name', encodeURI($('#name').val()));
                    self.model.set('observationSkill', $('#observationSkill').val());
                    self.model.set('initiative', $('#initiative').val());
                    self.model.set('initiativeModifier', $('#initiativeModifier').val());
                    self.model.set('misc', $('#misc').val());
                    self.model.set('level', $('#level').val());
                    self.model.set('stalkSkill', $('#stalkSkill').val());
                    self.model.set('senseAmbushSkill', $('#senseAmbushSkill').val());
                    self.model.set('alertnessSkill', $('#alertnessSkill').val());
                    self.model.set('perception', $('#perception').val());
                    self.model.set('hitPoints', $('#hitPoints').val());
                    self.model.set('hitPointsModifier', $('#hitPointsModifier').val());
                    self.model.set('will', $('#will').val());
                    self.model.set('willModifier', $('#willModifier').val());
                    self.model.set('quicknessBonus', $('#quicknessBonus').val());
                    self.model.set('racialModifier', $('#racialModifier').val());
                    self.model.set('armorChoice', $('#armorChoice').val());
                    self.model.set('armorOnArmor', $('#armorOnArmor').val());
                    self.model.set('shieldChoice', $('#shieldChoice').val());
                    self.model.set('skillChoice1', $('#skillChoice1').val());
                    self.model.set('skillChoice2', $('#skillChoice2').val());
                    self.model.set('specialAbility', $('#specialAbility').val());
                    self.model.set('miscItemChoice', $('#miscItemChoice').val());
                    self.model.set('adrenalDefense', $('#adrenalDefense').val());
                }
            )

        },
        createObjectWithAttributes : function() {
            var self = this;
            var tempObject = {};
            $.when(PlayerWarehouse.getPlayerWithName(self.chosenPlayer)).then(
                function(myPlayer) {
                    tempObject.playerID = myPlayer.get('id');
                    tempObject.name = encodeURI($('#name').val());

                    tempObject.observationSkill = $('#observationSkill').val();
                    tempObject.initiative = $('#initiative').val();
                    tempObject.initiativeModifier = $('#initiativeModifier').val();
                    tempObject.misc = $('#misc').val();
                    tempObject.level = $('#level').val();
                    tempObject.stalkSkill = $('#stalkSkill').val();
                    tempObject.senseAmbushSkill = $('#senseAmbushSkill').val();
                    tempObject.alertnessSkill = $('#alertnessSkill').val();
                    tempObject.perception = $('#perception').val();
                    tempObject.hitPoints = $('#hitPoints').val();
                    tempObject.hitPointsModifier = $('#hitPointsModifier').val();
                    tempObject.will = $('#will').val();
                    tempObject.willModifier = $('#willModifier').val();
                    tempObject.quicknessBonus = $('#quicknessBonus').val();
                    tempObject.racialModifier = $('#racialModifier').val();
                    tempObject.armorChoice = $('#armorChoice').val();
                    tempObject.armorOnArmor = $('#armorOnArmor').val();
                    tempObject.shieldChoice = $('#shieldChoice').val();
                    tempObject.skillChoice1 = $('#skillChoice1').val();
                    tempObject.skillChoice2 = $('#skillChoice2').val();
                    tempObject.specialAbility = $('#specialAbility').val();
                    tempObject.miscItemChoice = $('#miscItemChoice').val();
                    tempObject.adrenalDefense = $('#adrenalDefense').val();
                }
            )
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
