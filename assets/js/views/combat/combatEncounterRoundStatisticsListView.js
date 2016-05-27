define(['marionette',
    'realmApplication',
    'models/combat/combatEncounterModel',
    'views/combat/combatEncounterRoundStatisticsItemView',
    'utility/viewUtilities',
    "tpl!templates/combat/combatEncounterRoundStatisticsListTemplate.tpl",
    'logger',
    'services/combatEncounterWarehouse'
], function (Marionette, RealmApplication, CombatEncounterModel, CombatEncounterRoundStatisticsItemView, ViewUtilities, CombatEncounterRoundStatisticsListTemplate, Logger, CombatEncounterWarehouse) {
    var CombatEncounterRoundStatisticsListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'statisticsTable',
        className : 'table table-striped',
        template: CombatEncounterRoundStatisticsListTemplate,
        childView : CombatEncounterRoundStatisticsItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            self = this;
            this.listenTo(this.collection, 'add', this.render);
        }
    });

    return CombatEncounterRoundStatisticsListView;

});
