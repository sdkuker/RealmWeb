define(['backbone'],
    function (Backbone) {

        var CombatRound = Backbone.Model.extend({
            defaults: {
                encounterID : '',
                roundNumber : 0
            },

        });

        return CombatRound;

    });
