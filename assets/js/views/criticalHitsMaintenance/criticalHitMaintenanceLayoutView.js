define(['marionette',
        "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceLayoutTemplate.tpl"],
    function (Marionette, CriticalHitMaintenanceLayoutTemplate) {

        var CriticalHitMaintenanceLayoutiew = Marionette.LayoutView.extend({
            template: CriticalHitMaintenanceLayoutTemplate,
            regions : {
                criticalHitTypesMaintenanceRegion : '#criticalHitTypesMaintenanceRegion',
                criticalHitsMaintenanceRegion : '#criticalHitsMaintenanceRegion'
            }
        });

        return CriticalHitMaintenanceLayoutiew;

    });
