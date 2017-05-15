define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceListTemplate.tpl",
    'views/criticalHitsMaintenance/criticalHitMaintenanceListItemView'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, CriticalHitMaintenanceListTemplate, CriticalHitMaintenanceItemView) {
    var CriticalHitListView = Marionette.CompositeView.extend({
        tagName : 'ul',
        id : 'criticalHitList',
        className : 'list-group',
        template: CriticalHitMaintenanceListTemplate,
        childView : CriticalHitMaintenanceItemView,
        childViewContainer : 'ul',
        selectedModel : '',
        numberOfHitsToDisplay : 10,
        lastHitsDisplayedWasList : false,
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'criticalHitFilter:criticalHitSelected', function(selectedCriticalHitModelArray) {
                self.displayCriticalHit(selectedCriticalHitModelArray);
            });
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

    return CriticalHitListView;

});
