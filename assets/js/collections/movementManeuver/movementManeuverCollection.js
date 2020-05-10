define(['backbone', 'firebase', 'backfire', 'models/movementManeuver/movementManeuverModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, MovementManeuvereModel, ServiceConstants, Config) {

        var MovementManeuvereCollection = Backbone.Firebase.Collection.extend({
            difficultyId : null,
            autoSync : true,
            initialize: function(models, options) {
                if (options.difficultyId) {
                    this.difficultyId = options.difficultyId;
                };
                if (options.disableAutoSync) {
                    this.autoSync = false;
                }
            },
            url: function() {
                if (this.difficultyId) {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuver/')
                        .orderByChild("difficultyId").equalTo(this.difficultyId);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL  + '/'  +
                        Config.environment + '/movementManeuver/');
                }
            },
            model: MovementManeuvereModel,
            comparator: function(movementManeuvereModel) {
                return movementManeuvereModel.get('difficultyId') + '-' + parseInt(movementManeuvereModel.get('minimumRollValue'));
            },
            getManeuverForRoll: function(rollValue) {
                var self = this;
                var selectedModel = _.find(self.models,
                    function(model) {
                        if (model.get('minimumRollValue') <= rollValue &&
                            model.get('maximumRollValue') >= rollValue) {
                            return model;
                        }
                    });
                return selectedModel;
            }
        });

        return MovementManeuvereCollection;

    });
