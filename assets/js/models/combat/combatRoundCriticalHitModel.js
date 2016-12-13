define(['backbone'],
    function (Backbone) {

        var CombatRoundCriticalHit = Backbone.Model.extend({
            defaults: {
                combatRoundID : '',
                criticalHitID : '',
                characterID : ''
            }
        });

        return CombatRoundCriticalHit;

    });
