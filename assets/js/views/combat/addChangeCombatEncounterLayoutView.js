define(['marionette',
        'views/combat/addChangeCombatEncounterDescriptionView',
        'views/combat/addChangeCombatEncounterCharacterListLayoutView',
        'views/combat/addChangeCombatEncounterButtonView',
        'tpl!templates/combat/addChangeCombatEncounterLayoutTemplate.tpl'],
    function (Marionette, EncounterDescriptionView, CharacterListLayoutView, ButtonView, AddChangeCombatEncounterLayoutTemplate) {

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
            initialize : function(options) {
                self = this;
                self.combatEncounterCharacterCollection = options.combatEncounterCharacterCollection;
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
        });

        return AddChangeEncounterLayoutView;

    });
