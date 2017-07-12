define(['backbone', 'firebase', 'backfire', 'models/willContestConsequenceMaintenance/willContestConsequenceModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, WillContestConsequenceModel, ServiceConstants) {

        var WillContestConsequenceCollection = Backbone.Firebase.Collection.extend({
            orderByMinimumRollValue : false,
            initialize: function(models, options) {
                if (options.orderByMinimumRollValue) {
                    this.orderByMinimumRollValue = true;
                }
            },
            url: function() {
                if (this.orderByMinimumRollValue) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/willContestConsequence/')
                        .orderByChild("minimumRollValue");
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/willContestConsequence/');
                }
            },
            model: WillContestConsequenceModel,
            comparator: function(willContestConsequence) {
                return willContestConsequence.get('minimumRollValue');
            }
        });

        return WillContestConsequenceCollection;

    });
