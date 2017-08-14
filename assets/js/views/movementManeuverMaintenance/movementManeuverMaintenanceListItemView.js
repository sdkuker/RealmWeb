define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverModel'], function (Marionette, RealmApplication, MovementManeuverMaintenanceListItemTemplate, MovementManeuverMaintenanceModel) {
    var MovementManeuverMaintenanceListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : MovementManeuverMaintenanceModel,
        template: MovementManeuverMaintenanceListItemTemplate,
        events : {
            'click' : 'movementManeuverMaintenanceSelected'
        },
        movementManeuverMaintenanceSelected : function(event) {
            RealmApplication.vent.trigger('movementManeuverMaintenanceListMovementManeuverMaintenanceSelected', this, this.model);
        }
    });

    return MovementManeuverMaintenanceListItemView;

});
