define(['marionette',
    'realmApplication',
    "tpl!templates/combat/combatEncounterRoundStatisticItemTemplate.tpl",
    'models/combat/characterCombatRoundStatisticModel',
    'services/characterWarehouse'],
    function (Marionette, RealmApplication, StatisticsItemTemplate, StatisticsModel, CharacterWarehouse) {
        var CombatEncounterRoundStatisticsItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : StatisticsModel,
            template: StatisticsItemTemplate,
            templateHelpers : function() {
                    var myCharactersName = decodeURI(this.model.get('characterName'));
                    var myCharacter = CharacterWarehouse.getCharacterWithoutWaiting(this.model.get('characterID'));
                    var hitsRemaining = this.model.getHitsAtEndOfRound(myCharacter);
                    return {
                        myCharactersName : myCharactersName,
                        hitsRemaining : hitsRemaining
                    }
            },
            events : {
                'input' : 'tableCellUpdated'
            },
            tableCellUpdated : function(event) {
                console.log('a table cell was updated to value: ' + event.target.innerHTML + ' for element: ' + event.target.getAttribute('headers'));
            }
    });

    return CombatEncounterRoundStatisticsItemView;

});
