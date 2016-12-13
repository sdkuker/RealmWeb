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
            timeout: null,
            self : null,
            cellBeingEdited : null,
            inputEvent : null,
            tableCellUpdated : function(event) {
                self = this;
                self.inputEvent = event;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function() {
                    var targetID = self.inputEvent.target.getAttribute('headers');
                    var targetStringExcludingTags = self.inputEvent.target.innerHTML.replace(/(<([^>]+)>)/ig,"");
                    var targetValue = parseInt(targetStringExcludingTags);

                    if (isNaN(targetValue)) {
                        targetValue = 0;
                    }
                    this.cellBeingEdited = targetID;
                    var modelAttributeName = '';

                   // console.log('a table cell was updated to value: ' + targetValue + ' for element: ' + targetID);

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
                    self.model.set(modelAttributeName, targetValue);
                    self.render();

                }, 800);
            },
            onRender : function() {
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();

                }
            }
    });

    return CombatEncounterRoundStatisticsItemView;

});
