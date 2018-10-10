define(['backbone'],
    function (Backbone) {

        var WillContestModel = Backbone.Model.extend({
            defaults: {
                contestantOneID: '',
                contestantOneName : '',
                contestantTwoID: '',
                contestantTwoName : ''
            }
        });

        return WillContestModel;

    });
