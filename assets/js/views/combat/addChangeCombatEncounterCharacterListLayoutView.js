define(['marionette',
        'views/combat/addChangeCombatEncounterCharacterListView',
        'tpl!templates/combat/addChangeCombatEncounterCharacterListLayoutTemplate.tpl',],
    function (Marionette, AddChangeCombatEncounterCharacterListView, AddChangeCombatEncounterCharacterListLayoutTemplate,
              ) {

        var AddChangeCombatEncounterCharacterListLayoutView = Marionette.LayoutView.extend({
            template: AddChangeCombatEncounterCharacterListLayoutTemplate,
            regions : {
                addChangeCombatEncounterCharacterListRegion : '#addChangeCombatEncounterCharacterListRegion'
            },
            combatEncounterCharacterCollection : null,
            templateHelpers : function() {
                var encounterDescription = this.model.get('description');
                return {
                    encounterDescription : encounterDescription
                }
            },
            initialize : function(options) {
                self = this;
                self.combatEncounterCharacterCollection = options.combatEncounterCharacterCollection;
            },
            onRender: function() {
                var self = this;
                var listView = new AddChangeCombatEncounterCharacterListView({collection: self.combatEncounterCharacterCollection});
                this.showChildView('addChangeCombatEncounterCharacterListRegion', listView);
            }
        });

        return AddChangeCombatEncounterCharacterListLayoutView;

    });
