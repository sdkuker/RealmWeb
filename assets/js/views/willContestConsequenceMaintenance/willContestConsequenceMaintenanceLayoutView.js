define(['marionette',
        'realmApplication',
        "tpl!templates/willContestConsequenceMaintenance/willContestConsequenceMaintenanceLayoutTemplate.tpl",
        'views/willContestConsequenceMaintenance/willContestConsequenceMaintenanceListView'],
    function (Marionette, RealmApplication, WillContestConsequenceMaintenanceLayoutTemplate,
              WillContestConsequenceMaintenanceListView) {

        var WillContestConsequenceMaintenanceLayoutView = Marionette.LayoutView.extend({
            template: WillContestConsequenceMaintenanceLayoutTemplate,
            regions : {
                willContestConsequencesMaintenanceRegion : '#willContestConsequencesMaintenanceRegion'
            },
            initialize: function(options) {
                var self = this;
                self.consequenceCollection = options.consequenceCollection;
                this.listenTo(RealmApplication.vent, 'willContestConsequenceMaintenanceList:willContestConsequenceActioned', function() {
                    self.willContestConsequenceActioned();
                });
            },
            consequenceCollection : null,
            onRender: function() {
                var self = this;
                var listViewOptions = {collection : self.consequenceCollection,};
                var listView = new WillContestConsequenceMaintenanceListView(listViewOptions);
                this.showChildView('willContestConsequencesMaintenanceRegion', listView);
            }
        });

        return WillContestConsequenceMaintenanceLayoutView;

    });
