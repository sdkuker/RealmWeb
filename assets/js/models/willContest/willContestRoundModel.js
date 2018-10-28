define(['backbone', 'domain/combat/combatRoundAttributeDeterminer'],
    function (Backbone, CombatRoundAttributeDeterminer) {

        var WillContestRoundModel = Backbone.Model.extend({
            // note that the contestantOne modifiers are the values used to determin the consequence that was determined
            // this rount.  they do NOT have the modifiers from this consequence included in them.  See the
            // willContestWarehouse.createNextWillContestRound function for details.

            defaults: {
                willContestID: '',
                roundNumber : 0,
                contestantOneTotalWill : 0,
                contestantOneTotalWillDescription : '',
                contestantTwoTotalWill : 0,
                contestantTwoTotalWillDescription : '',
                consequenceValue : 0,
                consequenceId : '',
                consequenceDescription : '',
                consequencePermanentModifier : 0,
                consequenceTemporaryModifier: 0,
                consequenceTemporaryModifierExpirationRound : 0
            }
        });

        return WillContestRoundModel;

    });
