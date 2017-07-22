define(['marionette',
        "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListLayoutTemplate.tpl"],
    function (Marionette, MovementManeuverMaintenanceListLayoutTemplate) {

        var MovementManeuverMaintenanceListLayoutiew = Marionette.LayoutView.extend({
            template: MovementManeuverMaintenanceListLayoutTemplate,
            regions : {
                movementManeuverMaintenanceTableRegion : '#movementManeuverMaintenanceTableRegion',
                buttonsRegion : '#buttonsRegion'
            }
        });

        return MovementManeuverMaintenanceListLayoutiew;

    });
