define(['marionette',
        "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceLayoutTemplate.tpl",
        'views/criticalHitsMaintenance/criticalHitMaintenanceTypeView',
        'views/criticalHitsMaintenance/criticalHitMaintenanceListView',
        'services/criticalHitWarehouse'],
    function (Marionette, CriticalHitMaintenanceLayoutTemplate, CriticalHitMaintenanceTypeView,
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

                // this.listenTo(buttonsView, 'combatEncounterNextRoundButton:clicked', this.createAndDisplayNextRound);
                // this.listenTo(buttonsView, 'combatEncounterRoundNumberToDisplay:selected', this.displayRoundNumber);
                this.showChildView('criticalHitTypesMaintenanceRegion', typeView);
                this.showChildView('criticalHitsMaintenanceRegion', listView);
            },
        });

        return CriticalHitMaintenanceLayoutiew;

    });
