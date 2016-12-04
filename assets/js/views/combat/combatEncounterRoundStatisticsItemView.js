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
            cellBeingEdited : null,
            tableCellUpdated : function(event) {

                var targetID = event.target.getAttribute('headers');
                var targetValue = parseInt(event.target.innerHTML);
                if (isNaN(targetValue)) {
                    targetValue = 0;
                }
                var modelAttributeName = '';

                console.log('a table cell was updated to value: ' + targetValue + ' for element: ' + targetID);

                switch (targetID) {
                    case 'roundsStunned':
                        modelAttributeName = 'roundsStillStunned';
                        break;
                    case 'negativeModifier':
                        modelAttributeName = 'negativeModifier';
                        break;
                    case 'hitsTakenThisRound':
                        modelAttributeName = 'hitsTakenDuringRound';
                        break;
                    case 'bleeding':
                        modelAttributeName = 'bleeding';
                        break;
                    case 'regeneration':
                        modelAttributeName = 'regeneration';
                        break;
                }
                this.cellBeingEdited = targetID;
                this.model.set(modelAttributeName, targetValue);
                this.render();
            },
            onRender : function() {
                console.log('in onRender');
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();
                }
            }
    });

    return CombatEncounterRoundStatisticsItemView;

});
