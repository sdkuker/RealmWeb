define(['marionette',
        'realmApplication',
        'services/willContestWarehouse',
        "tpl!templates/willContest/willContestListLayoutTemplate.tpl",
        'views/willContest/willContestListView',
        'models/willContest/willContestModel'],
    function (Marionette, RealmApplication, WillContestWarehouse, WillContestListLayoutTemplate,
              WillContestListView, WillContestModel) {

        var WillContestListLayoutView = Marionette.LayoutView.extend({
            template: WillContestListLayoutTemplate,
            regions : {
                willContestListRegion : '#willContestListRegion',
                willContestListButtonsRegion : '#willContestListButtonsRegion'
            },
            initialize: function(options) {
                var self = this;
                self.contestCollection = options.contestCollection;
                this.listenTo(RealmApplication.vent, 'createWillContestButton:clicked', function() {
                    self.triggerCreateWillContestFunction();
                });
                this.listenTo(RealmApplication.vent, 'openWillContestButton:clicked', function() {
                    self.triggerOpenWillContestFunction();
                });
                this.listenTo(RealmApplication.vent, 'deleteWillContestButton:clicked', function() {
                    self.triggerDeleteWillContestFunction();
                });
                this.listenTo(RealmApplication.vent, 'willContestListWillContestSelected', function(model) {
                    self.willContestSelected(model);
                });
            },
            contestCollection : null,
            selectedModel : null,
            triggerCreateWillContestFunction : function() {
                $.when(WillContestWarehouse.createDefaultWillContest()).then(
                    function(aWillContestModel) {
                        RealmApplication.vent.trigger('willContestListAddWillContest', aWillContestModel);
                    }
                )
            },
            triggerOpenWillContestFunction : function() {
                //var model = this.collection.at($(':selected', this.$el).index());
                RealmApplication.vent.trigger('willContestListOpenWillContest', selectedModel);
            },
            triggerDeleteWillContestFunction : function() {
                //var model = this.collection.at($(':selected', this.$el).index());
                // figure this one out
            },
            willContestSelected : function(model) {
                selectedModel = model;
            }

        });

        return WillContestListLayoutView;

    });
