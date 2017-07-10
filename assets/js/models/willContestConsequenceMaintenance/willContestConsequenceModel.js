define(['backbone'],
    function (Backbone) {

        var WillContestConsequenceModel = Backbone.Model.extend({
            defaults: {
                description: '',
                permanentBonus : 0,
                minimumRollValue : 0,
                maximumRollValue : 0,
                temporaryBonus : 0,
                durationInRoundsOfTemporaryBonus : 0
            },
            getDescription: function() {
                return decodeURI(this.get('description'));
            },
            setDescription: function(aDescription) {
                return this.set('description', encodeURI(aDescription));
            }
        });

        return WillContestConsequenceModel;

    });
