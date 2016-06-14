define(['backbone'],
    function (Backbone) {

        var CombatEncounterModel = Backbone.Model.extend({
            defaults: {
                description : '',
                openRound: 0,
            },
            getDescription: function() {
                return decodeURI(this.get('description'));
            },
            setDescription: function(aDescription) {
                return this.set('description', encodeURI(aDescription));
            },
            hasAnyRounds : function() {
                var self = this;
                return self.openRound > 0;
            }
        });

        return CombatEncounterModel;

    });
