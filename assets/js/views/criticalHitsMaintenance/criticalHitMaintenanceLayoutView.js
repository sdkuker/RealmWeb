define(['marionette',
        'realmApplication',
        "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceLayoutTemplate.tpl",
        'views/criticalHitsMaintenance/criticalHitMaintenanceTypeView',
        'views/criticalHitsMaintenance/criticalHitMaintenanceListView',
        'services/criticalHitWarehouse'],
    function (Marionette, RealmApplication, CriticalHitMaintenanceLayoutTemplate, CriticalHitMaintenanceTypeView,
              CriticalHitMaintenanceListView, CriticalHitWarehouse) {

        var CriticalHitMaintenanceLayoutiew = Marionette.LayoutView.extend({
            template: CriticalHitMaintenanceLayoutTemplate,
            regions : {
                criticalHitTypesMaintenanceRegion : '#criticalHitTypesMaintenanceRegion',
                criticalHitsMaintenanceRegion : '#criticalHitsMaintenanceRegion'
            },
            initialize: function(options) {
                var self = this;
                self.criticalHitTypes = options.criticalHitTypes;
                self.selectedType = options.selectedType;
                self.criticalHitsForSelectedType = options.criticalHitsForSelectedType;
                this.listenTo(RealmApplication.vent, 'criticalHitMaintenanceType:typeSelected', function(criticalHitsForTypeCollection) {
                    self.displayCriticalHits(criticalHitsForTypeCollection);
                });
                this.listenTo(RealmApplication.vent, 'criticalHitMaintenanceList:criticalHitActioned', function(updatedCriticalHitCollection) {
                    self.criticalHitActioned(updatedCriticalHitCollection);
                });
            },
            criticalHitTypes : null,
            selectedType : null,
            criticalHitsForSelectedType : null,
            myTypeView : null,
            onRender: function() {
                var self = this;
                var typeViewOptions = {criticalHitTypes : self.criticalHitTypes,
                                        selectedType : self.selectedType,
                                        criticalHits : self.criticalHitsForSelectedType};
                self.myTypeView = new CriticalHitMaintenanceTypeView(typeViewOptions);
                var listViewOptions = {collection : self.criticalHitsForSelectedType,
                                        selectedType : self.selectedType};
                var listView = new CriticalHitMaintenanceListView(listViewOptions);

                this.showChildView('criticalHitTypesMaintenanceRegion', self.myTypeView);
                this.showChildView('criticalHitsMaintenanceRegion', listView);
            },
            criticalHitActioned : function(updatedCriticalHitCollection) {
                // a critical hit was added or deleted.  must update the type view's 'delete' button status.
                var self = this;
                self.myTypeView.options.criticalHits = updatedCriticalHitCollection;
                self.myTypeView.render();
            },
            displayCriticalHits : function(criticalHitTypeString) {
                var self = this;
                self.selectedType = criticalHitTypeString;

                $.when(CriticalHitWarehouse.getAllTypes()).then(
                    function(criticalHitTypeCollection) {
                        self.criticalHitTypes = criticalHitTypeCollection;
                        $.when(CriticalHitWarehouse.getCriticalHitsForTypeWithDefaultForAdd(self.selectedType)).then (
                            function(criticalHitsForSelectedTypeCollection) {
                                self.criticalHitsForSelectedType = criticalHitsForSelectedTypeCollection;
                                self.render();
                            }
                        )
                    }
                )

            }
        });

        return CriticalHitMaintenanceLayoutiew;

    });
