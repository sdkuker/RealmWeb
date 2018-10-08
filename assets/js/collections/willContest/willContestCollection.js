define(['backbone', 'firebase', 'backfire', 'models/willContest/willContestModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, WillContestModel, ServiceConstants, Config) {

        var WillContestCollection = Backbone.Firebase.Collection.extend({
            url: function () {
                return new Firebase(ServiceConstants.backFireBaseURL+ '/'  + Config.environment + '/willContest/');
            },
            model: WillContestModel
        });

        return WillContestCollection;

    });
