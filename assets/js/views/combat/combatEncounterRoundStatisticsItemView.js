define(['marionette',
    'realmApplication',
    "tpl!templates/combat/combatEncounterRoundStatisticItemTemplate.tpl",
    'models/combat/characterCombatRoundStatisticModel'], function (Marionette, RealmApplication, StatisticsItemTemplate, StatisticsModel) {
    var CombatEncounterRoundStatisticsItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : StatisticsModel,
        template: StatisticsItemTemplate,
        // templateHelpers : function() {
        //     var myPlayerName = this.model.playerName();
        //     var characterName = decodeURI(this.model.get('name'));
        //     return {
        //         playerName : myPlayerName,
        //         characterName : characterName
        //     }
        // },
        events : {
            'click' : 'combatRoundStatisticSelected'
        },
        combatRoundStatisticSelected : function(event) {
            RealmApplication.vent.trigger('combatRoundStatisticSelected', this, this.model);
        }
    });

    return CombatEncounterRoundStatisticsItemView;

});
