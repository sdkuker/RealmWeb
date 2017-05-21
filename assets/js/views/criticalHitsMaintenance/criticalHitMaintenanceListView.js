define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceListTemplate.tpl",
    'views/criticalHitsMaintenance/criticalHitMaintenanceListItemView'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, CriticalHitMaintenanceListTemplate, CriticalHitMaintenanceItemView) {
    var CriticalHitMaintenanceListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'criticalHitMaintenanceList',
        className : 'table table-striped',
        template: CriticalHitMaintenanceListTemplate,
        childView : CriticalHitMaintenanceItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'criticalHitFilter:criticalHitSelected', function(selectedCriticalHitModelArray) {
                self.displayCriticalHit(selectedCriticalHitModelArray);
            });
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
        },
        displayCriticalHit : function(aCriticalHitModelArray) {
            if (aCriticalHitModelArray) {
                var displayingAList = aCriticalHitModelArray.length > 1;
                if (displayingAList || this.lastHitsDisplayedWasList) {
                    //if displaying a list, empty everything that was there before
                    this.collection.reset();
                };
                for (index = 0; index < aCriticalHitModelArray.length; index++) {
                    var criticalHitWithoutID = aCriticalHitModelArray[index].toJSON();
                    delete criticalHitWithoutID.objectId;
                    this.collection.add(criticalHitWithoutID, {at: 0});
                    if (this.collection.length > this.numberOfHitsToDisplay && ! displayingAList) {
                        this.collection.pop();
                    }
                };
                this.lastHitsDisplayedWasList = displayingAList;
            }
        }
    });

    return CriticalHitMaintenanceListView;

});
