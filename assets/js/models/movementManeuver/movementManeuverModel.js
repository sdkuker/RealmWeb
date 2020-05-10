define(['backbone'],
    function (Backbone) {

        var MovementManeuvereModel = Backbone.Model.extend({
            defaults: {
                difficultyId: '',
                minimumRollValue : 0,
                maximumRollValue : 0,
                result : ''
            },
            getResult: function() {
                return decodeURI(this.get('result'));
            },
            setResult: function(aValue) {
                return this.set('result', encodeURI(aValue));
            }
        });

        return MovementManeuvereModel;

    });
