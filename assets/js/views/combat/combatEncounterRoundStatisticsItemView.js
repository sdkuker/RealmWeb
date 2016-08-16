define(['marionette',
    'realmApplication',
    "tpl!templates/combat/combatEncounterRoundStatisticItemTemplate.tpl",
    'models/combat/characterCombatRoundStatisticModel'], function (Marionette, RealmApplication, StatisticsItemTemplate, StatisticsModel) {
    var CombatEncounterRoundStatisticsItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : StatisticsModel,
        template: StatisticsItemTemplate,
        templateHelpers : function() {
            var myCharactersName = decodeURI(this.model.get('characterName'));
            return {
                myCharactersName : myCharactersName
            }
        },
        events : {
            'click' : 'combatRoundStatisticSelected'
        },
        combatRoundStatisticSelected : function(event) {
            RealmApplication.vent.trigger('combatRoundStatisticSelected', this, this.model);
        }
    });

    return CombatEncounterRoundStatisticsItemView;

});
