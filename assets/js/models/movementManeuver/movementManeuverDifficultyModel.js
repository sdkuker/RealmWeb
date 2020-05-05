define(['backbone'],
    function (Backbone) {

        var MovementManeuverDifficultyModel = Backbone.Model.extend({
            defaults: {
                levelOfDifficulty : 0,
                difficultyDescription : ''
            },
            getLevelOfDifficulty: function() {
                return decodeURI(this.get('levelOfDifficulty'));
            },
            setLevelOfDifficulty: function(aValue) {
                return this.set('levelOfDifficulty', encodeURI(aValue));
            },
            getDifficultyDescription: function() {
                return decodeURI(this.get('difficultyDescription'));
            },
            setDifficultyDescription: function(aValue) {
                return this.set('difficultyDescription', encodeURI(aValue));
            }
        });

        return MovementManeuverDifficultyModel;

    });
