define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, MovementManeuverMaintenanceListButtonTemplate) {

        var MovementManeuverMaintenanceListButtonView = Marionette.ItemView.extend({
            template: MovementManeuverMaintenanceListButtonTemplate,
            events : {
                'click #addButton' : 'addButtonClicked',
                'click #changeButton' : 'changeButtonClicked',
                'click #deleteButton' : 'deleteButtonClicked'
            },
            addButtonClicked : function() {
                RealmApplication.vent.trigger('movementManeuverMaintenanceListAddButton:clicked');
            },
            changeButtonClicked : function() {
                RealmApplication.vent.trigger('movementManeuverMaintenanceListChangeButton:clicked');
            },
            deleteButtonClicked : function() {
                RealmApplication.vent.trigger('movementManeuverMaintenanceListDeleteButton:clicked');
            },
        });

        return MovementManeuverMaintenanceListButtonView;

    });
