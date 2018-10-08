define(['backbone'],
    function (Backbone) {

        var WillContestModel = Backbone.Model.extend({
            defaults: {
                contestantOneID: '',
                contestantOneType : '',
                contestantOneName : '',
                contestantTwoID: '',
                contestantTwoType : '',
                contestantTwoName : ''
            }
        });

        return WillContestModel;

    });
