define(['marionette',
    'realmApplication',
    "tpl!templates/combat/combatEncounterRoundStatisticItemTemplate.tpl",
    'models/combat/characterCombatRoundStatisticModel',
    'services/characterWarehouse',
    'services/playerWarehouse'],
    function (Marionette, RealmApplication, StatisticsItemTemplate, StatisticsModel, CharacterWarehouse, PlayerWarehouse) {
        var CombatEncounterRoundStatisticsItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : StatisticsModel,
            template: StatisticsItemTemplate,
            isOpenRound : false,
            initialize : function(options) {
                this.isOpenRound = options.isOpenRound;
            },
            templateHelpers : function() {
                    var myCharactersName = decodeURI(this.model.get('characterName'));
                    var myCharacter = CharacterWarehouse.getCharacterWithoutWaiting(this.model.get('characterID'));
                    var myPlayer = PlayerWarehouse.getPlayerWithoutWaitingWithID(this.model.get('playerID'));
                    var myPlayersName = myPlayer.getName();
                    var hitsRemaining = this.model.getHitsAtEndOfRound(myCharacter);
                    var remainingNumberOfCharacterClones = this.calculateRemainingNumberOfCharacterClones(hitsRemaining);
                    var allowEditing = this.isOpenRound;
                    return {
                        myCharactersName : myCharactersName,
                        myPlayersName : myPlayersName,
                        hitsRemaining : hitsRemaining,
                        allowEditing : allowEditing,
                        remainingNumberOfCharacterClones : remainingNumberOfCharacterClones
                    }
            },
            events : {
                'input' : 'tableCellUpdated'
            },
            calculateRemainingNumberOfCharacterClones : function(hitsRemaining) {

                let instancesRemainingInteger = 0;

                if ( hitsRemaining > 0  && this.model.get('totalHitsPerClone') > 0 ) {
                    let instancesRemainingFloat = hitsRemaining / this.model.get('totalHitsPerClone');
                    instancesRemainingInteger = Math.trunc(instancesRemainingFloat);
                    let instancesRemainingRemainder = hitsRemaining % this.model.get('totalHitsPerClone');
                    if ( instancesRemainingRemainder > 0 ) {
                        instancesRemainingInteger = ++instancesRemainingInteger;
                    };
                }

                return instancesRemainingInteger;
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
                        case 'mustParry':
                            modelAttributeName = 'mustParry';
                            break;
                    }
                    self.model.set(modelAttributeName, targetValue);
                   // self.render();

                }, 1000);
            },
            onRender : function() {
                var self = this;
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();
                }
            }
    });

    return CombatEncounterRoundStatisticsItemView;

});
