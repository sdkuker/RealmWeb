define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    "tpl!templates/combat/addChangeCombatEncounterDescriptionTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, AddChangeCombatEncounterDescriptionTemplate, Logger, CombatEncounterWarehouse) {
    var AddCombatEncounterDescriptionView = Marionette.ItemView.extend({
        template: AddChangeCombatEncounterDescriptionTemplate,
        events : {
            'change' : 'descriptionChanged'
        },
        templateHelpers : function() {
            var myDescription = this.model.getDescription();
            return {
                myDescription : myDescription
            }
        },
        model: CombatEncounterModel,
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        onShow : function() {
            this.$el.find('#encounterDescription').focus();
        },
        descriptionChanged : function(event) {
            var self = this;
            var newDescription = event.target.value;
            self.model.setDescription(newDescription);
        }
    });

    return AddCombatEncounterDescriptionView;

});
