define(['marionette',
        'backbone',
        'realmApplication',
        'models/combat/combatEncounterModel',
        'tpl!templates/combat/addChangeCombatEncounterButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterModel,
              AddChangeCombatEncounterButtonTemplate) {

        var AddChangeCombatEncounterButtonView = Marionette.ItemView.extend({
            template: AddChangeCombatEncounterButtonTemplate,
            model: CombatEncounterModel,
            events : {
                'click #saveButton' : 'saveButtonClicked'
            },
            saveButtonClicked : function() {
                this.trigger('addChangeCombatEncounterSaveButton:clicked');
            }
        });

        return AddChangeCombatEncounterButtonView;

    });
