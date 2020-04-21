define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    "tpl!templates/combat/addChangeCombatEncounterDescriptionTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, AddChangeCombatEncounterDescriptionTemplate, Logger, CombatEncounterWarehouse) {
    var AddCombatEncounterView = Marionette.ItemView.extend({
        template: AddChangeCombatEncounterDescriptionTemplate,
        model: CombatEncounterModel,
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        onShow : function() {
            this.$el.find('#encounterDescription').focus();
        }
    });

    return AddCombatEncounterView;

});
