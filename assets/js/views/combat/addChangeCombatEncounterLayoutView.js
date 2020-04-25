define(['marionette',
        'realmApplication',
        'views/combat/addChangeCombatEncounterDescriptionView',
        'views/combat/addChangeCombatEncounterCharacterListLayoutView',
        'tpl!templates/combat/addChangeCombatEncounterLayoutTemplate.tpl'],
    function (Marionette, RealmApplication, EncounterDescriptionView, CharacterListLayoutView, AddChangeCombatEncounterLayoutTemplate) {

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
            },
            onRender: function() {
                var self = this;
                var descriptionView = new EncounterDescriptionView({model : this.model});
                var listLayoutView = new CharacterListLayoutView({model : this.model, combatEncounterCharacterCollection: self.combatEncounterCharacterCollection});
                this.showChildView('encounterDescriptionRegion', descriptionView);
                this.showChildView('encounterCharactersTableRegion', listLayoutView);
            },
            saveCombatEncounter : function() {
                var self = this;
            }
        });

        return AddChangeEncounterLayoutView;

    });
