define(['backbone', 'firebase', 'backfire', 'models/movementManeuver/movementManeuverDifficultyModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, MovementManeuverDifficultyModel, ServiceConstants, Config) {

        var MovementManeuverDifficultyCollection = Backbone.Firebase.Collection.extend({
            orderByDifficulty : false,
            autoSync : true,
            initialize: function(models, options) {
                if (options.orderByDifficulty) {
                    this.orderByDifficulty = true;
                };
            },
            url: function() {
                if (this.orderByDifficulty) {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuverDifficulty/')
                        .orderByChild("levelOfDifficulty");
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuverDifficulty/');
                }
            },
            model: MovementManeuverDifficultyModel,
            comparator: function(movementManeuverDifficultyModel) {
                return parseInt(movementManeuverDifficultyModel.get('levelOfDifficulty'));
            }
        });

        return MovementManeuverDifficultyCollection;

    });
