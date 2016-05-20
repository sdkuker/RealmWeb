define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    'views/combat/combatEncounterStatisticView',
    'utility/viewUtilities',
    "tpl!templates/combat/combatEncounterRoundTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, CombatEncounterStatisticView, ViewUtilities, CombatEncounterRoundTemplate, Logger, CombatEncounterWarehouse) {
    var CombatEncounterRoundView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'statisticsTable',
        className : 'table table-striped',
        template: CombatEncounterRoundTemplate,
        childView : CombatEncounterStatisticView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            self = this;
            this.listenTo(this.collection, 'add', this.render);
        }
    });

    return CombatEncounterRoundView;

});
