define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    'utility/viewUtilities',
    "tpl!templates/combat/addChangeCombatEncounterTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, ViewUtilities, AddChangeCombatEncounterTemplate, Logger, CombatEncounterWarehouse) {
    var AddCombatEncounterView = Marionette.ItemView.extend({
        template: AddChangeCombatEncounterTemplate,
        model: CombatEncounterModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        onShow : function() {
            this.$el.find('#encounterDescription').focus();
        },
        saveButtonClicked : function() {
            self = this;
            var newDescription = $('#encounterDescription').val();
            this.model.set('description', newDescription);
            // if it's a new model, add it to the collection
            if (! this.model.get('id')) {
                Logger.logInfo('About to add a new combat encounter model to the collection');
                $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                    function(myCombatEncounterCollection) {
                        myCombatEncounterCollection.add({description : newDescription});
                       // ViewUtilities.showModalView('Informational', 'Combat Encounter Saved');
                        RealmApplication.vent.trigger('viewCombatEncounterList');
                    }
                ),
                    function() {
                        console.log('some kind of error getting encounters for addition of an encounter');
                    }
            } else {
                // don't have to do anything if it's modifying an existing model -
                // firebase does that automatically
               // ViewUtilities.showModalView('Informational', 'Combat Encounter Saved');
                RealmApplication.vent.trigger('viewCombatEncounterList');
            }

        },
        deleteButtonClicked : function() {
            this.model.destroy().then(
                function(combatEncounterModel) {
                    Logger.logInfo('Combat encounter model successfully deleted');
                   // ViewUtilities.showModalView('Informational', 'Combat Encounter Deleted');
                    RealmApplication.vent.trigger('viewCombatEncounterList');
                },
                function(error) {
                    Logger.logErrror("commbat encounter model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Deleting the Combat Encounter.  See the log');
                }
            );
        }
    });

    return AddCombatEncounterView;

});
