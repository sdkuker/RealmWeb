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
        myRound : 999999,
        childViewOptions : function() {
            return {
                isOpenRound : this.model.get('openRound') == this.myRound ? true : false
            }
        },
        selectedModel : '',
        initialize : function(options) {
            self = this;
            self.myRound = options.roundNumber;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'changed', this.render);
        }
    });

    return CombatEncounterRoundStatisticsListView;

});
