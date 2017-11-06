define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceListTemplate.tpl",
    'views/criticalHitsMaintenance/criticalHitMaintenanceListItemView',
    'services/criticalHitWarehouse'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, CriticalHitMaintenanceListTemplate,
              CriticalHitMaintenanceItemView, CriticalHitWarehouse) {
    var CriticalHitMaintenanceListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'criticalHitMaintenanceList',
        className : 'table table-striped',
        template: CriticalHitMaintenanceListTemplate,
        childView : CriticalHitMaintenanceItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        selectedType : '',
        initialize : function(options) {
            var self = this;
            self.selectedType = options.selectedType;
            this.listenTo(RealmApplication.vent, 'criticalHitMaintenanceActionButton:clicked', function(criticalHitModelToAction) {
                self.actionCriticalHit(criticalHitModelToAction);
            });
        },
        actionCriticalHit : function(criticalHitModelToAction) {
            var self = this;
            if (criticalHitModelToAction.description) {
                // just an object that needs to be added
                criticalHitModelToAction.type  = this.selectedType;
                $.when(CriticalHitWarehouse.addCriticalHit(criticalHitModelToAction)).then(
                    function() {
                        $.when(CriticalHitWarehouse.getCriticalHitsForTypeWithDefaultForAdd(self.selectedType)).then(
                            function(aCollection) {
                                this.collection = aCollection;
                                RealmApplication.vent.trigger('criticalHitMaintenanceList:criticalHitActioned', aCollection);
                            }
                        )
                    }
                )
            } else {
                //will be an actual backbone model
                $.when(CriticalHitWarehouse.removeCriticalHit(criticalHitModelToAction)).then(
                    function() {
                        $.when(CriticalHitWarehouse.getCriticalHitsForTypeWithDefaultForAdd(self.collection.myType)).then(
                            function(aCollection) {
                                this.collection = aCollection;
                                RealmApplication.vent.trigger('criticalHitMaintenanceList:criticalHitActioned', aCollection);
                            }
                        )
                    }
                )
            }

        }
    });

    return CriticalHitMaintenanceListView;

});
