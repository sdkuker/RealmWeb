define(['backbone', 'firebase', 'backfire', 'models/movementManeuverMaintenance/movementManeuverModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, MovementManeuvereModel, ServiceConstants, Config) {

        var MovementManeuvereCollection = Backbone.Firebase.Collection.extend({
            orderByMinimumRollValue : false,
            initialize: function(models, options) {
                if (options.orderByMinimumRollValue) {
                    this.orderByMinimumRollValue = true;
                }
            },
            url: function() {
                if (this.orderByMinimumRollValue) {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuver/')
                        .orderByChild("minimumRollValue");
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuver/');
                }
            },
            model: MovementManeuvereModel,
            comparator: function(movementManeuvereModel) {
                return parseInt(movementManeuvereModel.get('minimumRollValue'));
            }
        });

        return MovementManeuvereCollection;

    });
