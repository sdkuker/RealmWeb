define(['backbone', 'domain/combat/combatRoundAttributeDeterminer'],
    function (Backbone, CombatRoundAttributeDeterminer) {

        var CharacterCombatRoundStatisticModel = Backbone.Model.extend({
            // encounterRoundID is these two IDs separated by a dash
            defaults: {
                encounterRoundID : '',
                characterID : '',
                characterName : '',
                initiative : 0,
                alertness : 0,
                observation : 0,
                totalHits : 0,
                bleeding : 0,
                roundsStillStunned : 0,
                negativeModifier : 0,
                regeneration : 0,
                hitsAtStartOfRound : 0,
                hitsTakenDuringRound : 0,
                characterTotalHitPointsAtStartOfRound : 0
            },
            setNegativeModifier : function(negModifierValue) {
                if (negModifierValue > 0) {
                    this.set({negativeModifier: negModifierValue * -1});
                } else
                    this.set({negativeModifier : negModifierValue});
            },
            cloneForCombat : function(aCharacterModel) {
                // returns a plain JS object with most of the attributes for a CharacterCombatRoundStatisticModel
                // it can be added to an active backfire collection.
                var theReturn = {};

                var changesToCharacterTotalHits = aCharacterModel.totalHitPoints() - this.get('characterTotalHitPointsAtStartOfRound');
                theReturn.characterID = aCharacterModel.get('id');
                theReturn.characterName = this.get('characterName');
                theReturn.initiative = CombatRoundAttributeDeterminer.determineBaseCombatInitiative(aCharacterModel);
                theReturn.characterTotalHitPointsAtStartOfRound = aCharacterModel.totalHitPoints();
                theReturn.totalHits = this.get('totalHits') + changesToCharacterTotalHits;
                theReturn.hitsAtStartOfRound = this.getHitsAtEndOfRound(aCharacterModel) + changesToCharacterTotalHits;
                theReturn.bleeding = this.get('bleeding');
                theReturn.roundsStillStunned = this.get('roundsStillStunned');
                theReturn.negativeModifier = this.get('negativeModifier');
                theReturn.regeneration = this.get('regeneration');
                theReturn.alertness = this.get('alertness');
                theReturn.observation = this.get('observation');

                //TODO still need to do something about the critial hits sufferred

                return theReturn;
            },
            getHitsAtEndOfRound : function(aCharacterModel) {
                var calculatedHitsAtEndOfRound = this.get('hitsAtStartOfRound') - this.get('hitsTakenDuringRound') -
                    this.get('bleeding') + this.get('regeneration');
                return (Math.min(calculatedHitsAtEndOfRound, aCharacterModel.totalHitPoints()));
            }

        });

        return CharacterCombatRoundStatisticModel;

    });
