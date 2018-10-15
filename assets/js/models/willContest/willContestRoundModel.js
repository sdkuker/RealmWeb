define(['backbone', 'domain/combat/combatRoundAttributeDeterminer'],
    function (Backbone, CombatRoundAttributeDeterminer) {

        var WillContestRoundModel = Backbone.Model.extend({
            defaults: {
                willContestID: '',
                roundNumber : 0,
                contestantOneTotalWill : 0,
                contestantTwoTotalWill : 0,
                contestantOnePermanentModifier : 0,
                contestantOneTemporaryModifier : 0,
                contestantOneTemporaryModifierExpirationRound : 0,
                consequenceId : '',
                consequenceDescription : ''
            }
        });

        return WillContestRoundModel;

    });
