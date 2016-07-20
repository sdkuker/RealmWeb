define(['backbone'],
    function (Backbone) {

        var CharacterCombatRoundStatisticModel = Backbone.Model.extend({
            // encounterRoundID is these two IDs separated by a dash
            defaults: {
                encounterRoundID : '',
                characterID : '',
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
                characterTotalHitPointsAtStartOfRound : 0,
            }

        });

        return CharacterCombatRoundStatisticModel;

    });
