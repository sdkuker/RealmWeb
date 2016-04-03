define(['backbone'],
    function (Backbone) {

        var CombatEncounterModel = Backbone.Model.extend({
            defaults: {
                description : '',
            },
            getDescription: function() {
                return decodeURI(this.get('description'));
            },
            setDescription: function(aDescription) {
                return this.set('description', encodeURI(aDescription));
            }
        });

        return CombatEncounterModel;

    });
