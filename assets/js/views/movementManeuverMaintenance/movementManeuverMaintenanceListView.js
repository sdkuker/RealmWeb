define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/movementManeuverMaintenance/movementManeuverModel',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListTemplate.tpl",
    'views/movementManeuverMaintenance/movementManeuverMaintenanceListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, MovementManeuverMaintenanceModel, MovementManeuverMaintenanceListTemplate, MovementManeuverMaintenanceView  ) {
    var MovementManeuverMaintenanceListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'movementManeuverMaintenanceTable',
        className : 'table table-striped',
        template: MovementManeuverMaintenanceListTemplate,
        childView : MovementManeuverMaintenanceView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'movementManeuverMaintenanceListAddButton:clicked', function() {
                self.triggerAddMovementManeuverMaintenanceFunction();
            });
            this.listenTo(RealmApplication.vent, 'movementManeuverMaintenanceListChangeButton:clicked', function() {
                self.triggerEditMovementManeuverMaintenanceFunction();
            });
            this.listenTo(RealmApplication.vent, 'movementManeuverMaintenanceListDeleteButton:clicked', function() {
                self.triggerDeleteMovementManeuverMaintenanceFunction();
            });
            this.listenTo(RealmApplication.vent, 'movementManeuverMaintenanceListMovementManeuverMaintenanceSelected', function(tableRow, model) {
                self.movementManeuverMaintenanceSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        triggerAddMovementManeuverMaintenanceFunction : function() {
            RealmApplication.vent.trigger('movementManeuverMaintenanceListAddMovementManeuverMaintenance', new MovementManeuverMaintenanceModel());
        },
        triggerEditMovementManeuverMaintenanceFunction : function() {
            self = this;
            if (self.selectedModel) {
                RealmApplication.vent.trigger('movementManeuverMaintenanceListChangeMovementManeuverMaintenance', self.selectedModel);
            } else {
                ViewUtilities.showModalView('Error', 'You must select an entry to change');
            }
        },
        triggerDeleteMovementManeuverMaintenanceFunction : function() {
            if (self.selectedModel) {
                this.collection.remove(self.selectedModel);
                Logger.logInfo('movementManeuverMaintenance model deleted');
                ViewUtilities.showModalView('Informational', 'Entry with minimum roll value: ' + self.selectedModel.get('minimumRollValue') + ' Deleted');
                self.selectedModel = null;
                RealmApplication.vent.trigger('viewMovementManeuverMaintenanceList');
            } else {
                ViewUtilities.showModalView('Error', 'You must select an entry to delete');
            }

        },
        movementManeuverMaintenanceSelected : function(tableRow, model) {
            self = this;
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            self.selectedModel = model;
        }
    });

    return MovementManeuverMaintenanceListView;

});
