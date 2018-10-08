define(['marionette',
        'realmApplication',
        'logger',
        'utility/viewUtilities',
        "tpl!templates/willContest/willContestListTemplate.tpl",
        'views/willContest/willContestListItemView',
        'services/willContestWarehouse',
        'models/willContest/willContestModel'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, WillContestListTemplate,
              WillContestItemView, WillContestWarehouse, WillContestModel) {
        var WillContestListView = Marionette.CompositeView.extend({
            tagName : 'table',
            id : 'willContestList',
            className : 'table table-striped',
            template: WillContestListTemplate,
            childView : WillContestItemView,
            childViewContainer : 'tbody',
            selectedModel : '',
            initialize : function(options) {
                var self = this;
                this.listenTo(RealmApplication.vent, 'willContestSelected', function(tableRow, model) {
                    self.willContestSelected(tableRow, model);
                });
                this.listenTo(this.collection, 'add', this.render);
            },
            willContestSelected : function(tableRow, model) {
                $(tableRow.el).siblings().removeClass('info');
                $(tableRow.el).addClass('info');
                selectedModel = model;
                RealmApplication.vent.trigger('willContestListWillContestSelected', model);
            }
        });

        return WillContestListView;

    });
