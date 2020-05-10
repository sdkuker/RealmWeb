define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverModel'], function (Marionette, RealmApplication, MovementManeuverMaintenanceListItemTemplate, MovementManeuverModel) {
    var MovementManeuverMaintenanceListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : MovementManeuverModel,
        template: MovementManeuverMaintenanceListItemTemplate,
        events : {
            'click' : 'movementManeuverMaintenanceSelected'
        },
        templateHelpers : function() {
            var myResult = null;
            if (this.model.get('result')) {
                myResult = decodeURI(this.model.get('result').replace(/%\s/g, " percent "));
            };
            var actionLabel = this.model.get('id') ? 'Delete' : 'Add';
            return {
                myResult : myResult,
                actionLabel : actionLabel
            }
        },
        movementManeuverMaintenanceSelected : function(event) {
            RealmApplication.vent.trigger('movementManeuverMaintenanceListMovementManeuverMaintenanceSelected', this, this.model);
        }
    });

    return MovementManeuverMaintenanceListItemView;

});
