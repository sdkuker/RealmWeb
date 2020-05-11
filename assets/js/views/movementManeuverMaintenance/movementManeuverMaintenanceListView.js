define(['marionette',
    'realmApplication',
    'logger',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListTemplate.tpl",
    'views/movementManeuverMaintenance/movementManeuverMaintenanceListItemView',
    'services/movementManeuverWarehouse'],
    function (Marionette, RealmApplication, Logger,
        MovementManeuverMaintenanceListTemplate, MovementManeuverMaintenanceView, MovementManeuverWarehouse) {
        var MovementManeuverMaintenanceListView = Marionette.CompositeView.extend({
            tagName: 'table',
            id: 'movementManeuverMaintenanceTable',
            className: 'table table-striped',
            template: MovementManeuverMaintenanceListTemplate,
            childView: MovementManeuverMaintenanceView,
            childViewContainer: 'tbody',
            selectedModel: '',
            initialize: function () {
                var self = this;
                this.listenTo(RealmApplication.vent, 'movementManeuverMaintenanceActionButton:clicked', function (movementManeuverModelToAction) {
                    self.actionMovementManeuver(movementManeuverModelToAction);
                });
                this.listenTo(this.collection, 'add', this.render);
            },
            actionMovementManeuver: function (movementManeuverModelToAction) {
                if (movementManeuverModelToAction.result) {
                    // just an object that needs to be added
                    $.when(MovementManeuverWarehouse.addMovementManeuver(movementManeuverModelToAction)).then(
                        function () {
                            $.when(MovementManeuverWarehouse.getMovementManeuversForDifficultyWithDefaultForAdd()).then(
                                function (aCollection) {
                                    this.collection = aCollection;
                                    RealmApplication.vent.trigger('movementManeuvereMaintenanceList:movementManeuverActioned');
                                }
                            )
                        }
                    )
                } else {
                    //will be an actual backbone model
                    $.when(MovementManeuverWarehouse.removeMovementManeuver(movementManeuverModelToAction)).then(
                        function () {
                            RealmApplication.vent.trigger('movementManeuvereMaintenanceList:movementManeuverActioned');
                        }
                    )
                }
            }
        });

        return MovementManeuverMaintenanceListView;

    });
