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
            },
            criticalHitTypes : null,
            selectedType : null,
            criticalHitsForSelectedType : null,
            onRender: function() {
                var self = this;
                var typeViewOptions = {criticalHitTypes : self.criticalHitTypes,
                                        selectedType : self.selectedType};
                var typeView = new CriticalHitMaintenanceTypeView(typeViewOptions);
                var listViewOptions = {collection : self.criticalHitsForSelectedType};
                var listView = new CriticalHitMaintenanceListView(listViewOptions);

                this.showChildView('criticalHitTypesMaintenanceRegion', typeView);
                this.showChildView('criticalHitsMaintenanceRegion', listView);
            },
            displayCriticalHits : function(criticalHitTypeString) {
                var self = this;
                self.selectedType = criticalHitTypeString;

                $.when(CriticalHitWarehouse.getAllTypes()).then(
                    function(criticalHitTypeCollection) {
                        self.criticalHitTypes = criticalHitTypeCollection;
                        $.when(CriticalHitWarehouse.getCriticalHitsForType(self.selectedType)).then (
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
