define(['backbone', 'firebase', 'backfire', 'models/movementManeuver/movementManeuverModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, MovementManeuvereModel, ServiceConstants, Config) {

        var MovementManeuvereCollection = Backbone.Firebase.Collection.extend({
            orderByMinimumRollValue : false,
            autoSync : true,
            initialize: function(models, options) {
                if (options.orderByMinimumRollValue) {
                    this.orderByMinimumRollValue = true;
                };
                if (options.disableAutoSync) {
                    this.autoSync = false;
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
            },
            getManeuverForRoll: function(rollValue) {
                var self = this;
                var selectedModel = _.find(self.models,
                    function(model) {
                        if (model.get('minimumRollValue') <= rollValue &&
                            model.get('maximumRollValue') >= rollValue) {
                            selectedModel = model;
                        }
                    });
                return selectedModel;
            }
        });

        return MovementManeuvereCollection;

    });
