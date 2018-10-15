define(['backbone', 'firebase', 'backfire', 'models/willContest/willContestRoundModel',
        'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, WillContestRoundModel, ServiceConstants, Config) {

        var WillContestRoundsCollection = Backbone.Firebase.Collection.extend({
            willContestID : null,
            initialize: function(models, options) {
                // return all the rounds if no will contest id was specified
                // you cannot  add round to a collection generated with an orderByChild or equalTo clause
                if (options) {
                    if (options.willContestID) {
                        this.willContestID = encodeURI(options.willContestID);
                    }
                };
            },
            url: function () {
                if (this.willContestID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment +
                        '/willContestRounds').orderByChild('willContestID').equalTo(this.willContestID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment +
                        '/willContestRounds');
                }
            },
            model: WillContestRoundModel
        });

        return WillContestRoundsCollection;

    });
