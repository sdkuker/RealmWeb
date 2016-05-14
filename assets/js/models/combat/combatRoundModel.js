define(['backbone'],
    function (Backbone) {

        var CombatRound = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                status: 'open',
                roundNumber : 0
            },

        });

        return CombatRound;

    });
