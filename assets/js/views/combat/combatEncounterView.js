define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    'utility/viewUtilities',
    "tpl!templates/combat/combatEncounterTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, ViewUtilities, CombatEncounterTemplate, Logger, CombatEncounterWarehouse) {
    var PlayerView = Marionette.ItemView.extend({
        template: CombatEncounterTemplate,
        model: CombatEncounterModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        templateHelpers : function() {
            var encounterDescription = this.model.getDescription();
            return {
                encounterDescription : encounterDescription
            }
        },
        saveButtonClicked : function() {
            self = this;
            var newDescription = $('#combatEncounterDescription').val();
            this.model.setDescription(newDescription);
            // if it's a new model, add it to the collection
            if (! this.model.get('id')) {
                Logger.logInfo('About to add a new combat encounter model to the collection');
                $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                    function(myCombatEncounterCollection) {
                        myCombatEncounterCollection.add({description : encodeURI(newDescription)});
                        ViewUtilities.showModalView('Informational', 'Combat Encounter Saved');
                        RealmApplication.vent.trigger('viewCombatEncounterList');
                    }
                ),
                    function() {
                        console.log('some kind of error getting encounters for addition of combat encouner');
                    }
            } else {
                // don't have to do anything if it's modifying an existing model -
                // firebase does that automatically
                ViewUtilities.showModalView('Informational', 'Combat Encounter Saved');
                RealmApplication.vent.trigger('viewCombatEncounterList');
            }

        },
        deleteButtonClicked : function() {
            this.model.destroy().then(
                function(playerModel) {
                    Logger.logInfo('combat encounter model successfully saved');
                    ViewUtilities.showModalView('Informational', 'Combat Encounter Deleted');
                    RealmApplication.vent.trigger('viewCombatEncounterList');
                },
                function(error) {
                    Logger.logErrror("combat encounter model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Saving the Combat Encounter.  See the log');
                }
            );
        }
    });

    return PlayerView;

});
