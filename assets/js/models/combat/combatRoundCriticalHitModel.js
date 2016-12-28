define(['backbone'],
    function (Backbone) {

        var CombatRoundCriticalHit = Backbone.Model.extend({
            defaults: {
                combatEncounterID : '',
                combatRoundID : '',
                combatRoundNumber : '',
                criticalHitID : '',
                characterID : '',
                criticalHitDescription : '',
                timeOfHit : ''
            }
        });

        return CombatRoundCriticalHit;

    });
