define(['backbone', 'firebase', 'backfire', 'models/willContestConsequenceMaintenance/willContestConsequenceModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, WillContestConsequenceModel, ServiceConstants, Config) {

        var WillContestConsequenceCollection = Backbone.Firebase.Collection.extend({
            orderByMinimumRollValue : false,
            initialize: function(models, options) {
                if (options.orderByMinimumRollValue) {
                    this.orderByMinimumRollValue = true;
                }
            },
            url: function() {
                if (this.orderByMinimumRollValue) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/willContestConsequence/')
                        .orderByChild("minimumRollValue");
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/willContestConsequence/');
                }
            },
            model: WillContestConsequenceModel,
            comparator: function(willContestConsequence) {
                return parseInt(willContestConsequence.get('minimumRollValue'));
            }
        });

        return WillContestConsequenceCollection;

    });
