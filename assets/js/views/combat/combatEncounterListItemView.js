define(['marionette',
    'realmApplication',
    "tpl!templates/combat/combatEncounterListItemTemplate.tpl",
    'models/combat/combatEncounterModel'], function (Marionette, RealmApplication, CombatEncounterListItemTemplate, CombatEncounterModel) {
    var CombatEncounterListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : CombatEncounterModel,
        template: CombatEncounterListItemTemplate,
        events : {
            'click' : 'encounterSelected'
        },
        templateHelpers : function() {
            var encounterDescription = this.model.getDescription();
            return {
                encounterDescription : encounterDescription
            }
        },
        encounterSelected : function(event) {
            RealmApplication.vent.trigger('combatEncounterListEncounterSelected', this, this.model);
        }
    });

    return CombatEncounterListItemView;

});
