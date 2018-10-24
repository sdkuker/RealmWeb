define(['marionette',
        'realmApplication',
        "tpl!templates/willContest/willContestListItemTemplate.tpl",
        'models/willContest/willContestModel',
        'services/willContestWarehouse',
        'utility/viewUtilities'],
    function (Marionette, RealmApplication, WillContestListItemTemplate, WillContestModel,
              WillContestWarehouse, ViewUtilities) {
        var WillContestItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : WillContestModel,
            template: WillContestListItemTemplate,
            newModelAttributes : {},
            initialize : function(options) {
                this.listenTo(this.model, 'change', this.render);
            },
            templateHelpers : function() {
                var contestantOneName = null;
                var contestantTwoName = null;
                if (this.model.get('contestantOneName')) {
                    contestantOneName = decodeURI(this.model.get('contestantOneName').replace(/%\s/g, " percent "));
                };
                if (this.model.get('contestantTwoName')) {
                    contestantTwoName = decodeURI(this.model.get('contestantTwoName').replace(/%\s/g, " percent "));
                };
                return {
                    contestantOneName : contestantOneName,
                    contestantTwoName : contestantTwoName
                }
            },
            events : {
                'click' : 'willContestSelected'
            },
            willContestSelected : function(event) {
                RealmApplication.vent.trigger('willContestSelected', this, this.model);
            }
        });

        return WillContestItemView;

    });
