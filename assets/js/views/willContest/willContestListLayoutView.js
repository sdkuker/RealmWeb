define(['marionette',
        'realmApplication',
        'services/willContestWarehouse',
        "tpl!templates/willContest/willContestListLayoutTemplate.tpl",
        'views/willContest/willContestListView',
        'utility/viewUtilities',
        'models/willContest/willContestModel'],
    function (Marionette, RealmApplication, WillContestWarehouse, WillContestListLayoutTemplate,
              WillContestListView, ViewUtilities, WillContestModel) {

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
                var self = this;
                if(self.selectedModel) {
                    RealmApplication.vent.trigger('willContestListOpenWillContest', selectedModel);
                } else {
                    ViewUtilities.showModalView('Error', 'Must select a contest to open');
                }

            },
            triggerDeleteWillContestFunction : function() {
                var self = this;
                if(self.selectedModel) {
                    $.when(WillContestWarehouse.removeWillContest(self.selectedModel)).then(
                        function() {
                            RealmApplication.vent.trigger('willContestListWillContestDeleted', selectedModel);
                        }
                    )
                } else {
                    ViewUtilities.showModalView('Error', 'Must select a contest to delete');
                }
            },
            willContestSelected : function(model) {
                this.selectedModel = model;
            }

        });

        return WillContestListLayoutView;

    });
