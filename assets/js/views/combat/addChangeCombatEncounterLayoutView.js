define(['marionette',
        'realmApplication',
        'views/combat/addChangeCombatEncounterDescriptionView',
        'views/combat/addChangeCombatEncounterCharacterListLayoutView',
        'views/combat/addChangeCombatEncounterButtonView',
        'tpl!templates/combat/addChangeCombatEncounterLayoutTemplate.tpl'],
    function (Marionette, RealmApplication, EncounterDescriptionView, CharacterListLayoutView, ButtonView, AddChangeCombatEncounterLayoutTemplate) {

        var AddChangeEncounterLayoutView = Marionette.LayoutView.extend({
            template: AddChangeCombatEncounterLayoutTemplate,
            regions : {
                encounterDescriptionRegion : '#encounterDescriptionRegion',
                encounterCharactersTableRegion : '#encounterCharactersTableRegion',
                encounterButtonsRegion : '#encounterButtonsRegion'
            },
            templateHelpers : function() {
                var encounterDescription = this.model.get('description');
                return {
                    encounterDescription : encounterDescription
                }
            },
            combatEncounterCharacterCollection : null,
            combatEncounterCharactersAdded : [],
            combatEncounterCharactersRemoved : [],
            initialize : function(options) {
                var self = this;
                self.combatEncounterCharacterCollection = options.combatEncounterCharacterCollection;
                this.listenTo(RealmApplication.vent, 'combatEncounterCharacterChecked', function(model) {
                    self.combatEncounterCharacterChecked(model);
                });
                this.listenTo(RealmApplication.vent, 'combatEncounterCharacterUnchecked', function(model) {
                    self.combatEncounterCharacterUnchecked(model);
                });
            },
            onRender: function() {
                var self = this;
                var descriptionView = new EncounterDescriptionView({model : this.model});
                var listLayoutView = new CharacterListLayoutView({model : this.model, combatEncounterCharacterCollection: self.combatEncounterCharacterCollection});
                var buttonsView = new ButtonView({model : this.model});
                this.listenTo(buttonsView, 'addChangeCombatEncounterSaveButton:clicked', this.saveCombatEncounter);
                this.showChildView('encounterButtonsRegion', buttonsView);
                this.showChildView('encounterDescriptionRegion', descriptionView);
                this.showChildView('encounterCharactersTableRegion', listLayoutView);
            },
            saveCombatEncounter : function() {
                var self = this;
            },
            combatEncounterCharacterChecked : function(combatEncounterCharacterModel) {
                var self = this;
                var indexOfAlreadyRemovedCharacter = self.combatEncounterCharactersRemoved.findIndex(
                    alreadyRemovedCharacter => {
                        return alreadyRemovedCharacter.get('id') === combatEncounterCharacterModel.get('id')
                    }
                )
                if (indexOfAlreadyRemovedCharacter > -1) {
                    self.combatEncounterCharactersRemoved.splice(indexOfAlreadyRemovedCharacter, 1);
                } else {
                    self.combatEncounterCharactersAdded.push(combatEncounterCharacterModel);
                }
            },
            combatEncounterCharacterUnchecked : function(combatEncounterCharacterModel) {
                var self = this;
                var indexOfAlreadyAddedCharacter = self.combatEncounterCharactersAdded.findIndex(
                    alreadyAddedCharacter => {
                        return alreadyAddedCharacter.get('id') === combatEncounterCharacterModel.get('id')
                    }
                )
                if (indexOfAlreadyAddedCharacter > -1) {
                    self.combatEncounterCharactersAdded.splice(indexOfAlreadyAddedCharacter, 1);
                } else {
                    self.combatEncounterCharactersRemoved.push(combatEncounterCharacterModel);
                }
            }
        });

        return AddChangeEncounterLayoutView;

    });
