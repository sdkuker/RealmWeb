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
            initialize : function(options) {
                self = this;
                self.combatEncounterCharacterCollection = options.combatEncounterCharacterCollection;
            },
            onRender: function() {
                var self = this;
                var listView = new AddChangeCombatEncounterCharacterListView({collection: self.combatEncounterCharacterCollection, encounterHasStarted: self.model.hasAnyRounds()});
                this.showChildView('addChangeCombatEncounterCharacterListRegion', listView);
            }
        });

        return AddChangeCombatEncounterCharacterListLayoutView;

    });
