define(['backbone', 'firebase', 'backfire', 'models/willContestConsequenceMaintenance/willContestConsequenceModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, WillContestConsequenceModel, ServiceConstants) {

        var WillContestConsequenceCollection = Backbone.Firebase.Collection.extend({
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/willContestConsequence/')
                        .orderByChild("minimumRollValue");
            },
            model: WillContestConsequenceModel,
            comparator: function(willContestConsequence) {
                return willContestConsequence.get('minimumRollValue');
            }
        });

        return WillContestConsequenceCollection;

    });
