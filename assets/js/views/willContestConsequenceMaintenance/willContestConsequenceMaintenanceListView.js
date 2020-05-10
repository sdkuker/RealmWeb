define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/willContestConsequenceMaintenance/willContestConsequenceMaintenanceListTemplate.tpl",
    'views/willContestConsequenceMaintenance/willContestConsequenceMaintenanceListItemView',
    'services/willContestConsequenceWarehouse'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, WillContestConsequenceMaintenanceListTemplate,
              WillContestConsequenceMaintenanceItemView, WillContestConsequenceWarehouse) {
    var WillContestConsequenceMaintenanceListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'willContestConsequenceMaintenanceList',
        className : 'table table-striped',
        template: WillContestConsequenceMaintenanceListTemplate,
        childView : WillContestConsequenceMaintenanceItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function(options) {
            var self = this;
            this.listenTo(RealmApplication.vent, 'willContestConsequenceMaintenanceActionButton:clicked', function(willContestConsequenceModelToAction) {
                self.actionWillContestConsequence(willContestConsequenceModelToAction);
            });
        },
        actionWillContestConsequence : function(willContestConsequenceModelToAction) {
            if (willContestConsequenceModelToAction.description) {
                // just an object that needs to be added
                $.when(WillContestConsequenceWarehouse.addWillContestConsequence(willContestConsequenceModelToAction)).then(
                    function() {
                        $.when(WillContestConsequenceWarehouse.getAllWillContestConsequencesWithDefaultForAdd()).then(
                            function(aCollection) {
                                this.collection = aCollection;
                                RealmApplication.vent.trigger('willContestConsequenceMaintenanceList:willContestConsequenceActioned');
                            }
                        )
                    }
                )
            } else {
                //will be an actual backbone model
                $.when(WillContestConsequenceWarehouse.removeWillContestConsequence(willContestConsequenceModelToAction)).then(
                    function() {
                        RealmApplication.vent.trigger('willContestConsequenceMaintenanceList:willContestConsequenceActioned');
                    }
                )
            }
        }
    });

    return WillContestConsequenceMaintenanceListView;

});
