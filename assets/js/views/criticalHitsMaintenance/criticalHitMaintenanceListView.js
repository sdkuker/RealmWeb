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
            this.listenTo(RealmApplication.vent, 'criticalHitFilter:criticalHitSelected', function(selectedCriticalHitModelArray) {
                self.displayCriticalHit(selectedCriticalHitModelArray);
            });
            this.listenTo(RealmApplication.vent, 'criticalHitMaintenanceActionButton:clicked', function(criticalHitModelToAction) {
                self.actionCriticalHit(criticalHitModelToAction);
            });
            // this.listenTo(this.collection, 'add', this.collectionChanged);
            // this.listenTo(this.collection, 'remove', this.render);
        },
        collectionChanged : function() {
            console.log("here");
            this.render();
        },
        onRender : function() {
            console.log('rendering');
        },
        actionCriticalHit : function(criticalHitModelToAction) {
            if (criticalHitModelToAction.description) {
                // just an object that needs to be added
                criticalHitModelToAction.type  = this.selectedType;
                $.when(CriticalHitWarehouse.addCriticalHit(criticalHitModelToAction)).then(
                    function() {
                        $.when(CriticalHitWarehouse.getCriticalHitsForTypeWithDefaultForAdd(this.selectedType)).then(
                            function(aCollection) {
                                this.collection = aCollection;
 //                               this.render();
                            }
                        )
                    }
                )
            } else {
                //will be an actual backbone model
                $.when(CriticalHitWarehouse.removeCriticalHit(criticalHitModelToAction)).then(
                    function() {
 //                       this.render();
                    }
                )
            }

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
