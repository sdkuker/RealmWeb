define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceLayoutTemplate.tpl",
    'views/movementManeuverMaintenance/movementManeuverDifficutliesMaintenanceView',
    'views/movementManeuverMaintenance/movementManeuverMaintenanceListView',
    'services/movementManeuverWarehouse'],
    function (Marionette, RealmApplication, MovementManeuverMaintenanceLayoutTemplate, MovementManeuverDifficultiesMainteanceView,
        MovementManeuverMaintenanceListView, MovementManeuverWarehouse) {

        var MovementManeuverMaintenanceLayoutiew = Marionette.LayoutView.extend({
            template: MovementManeuverMaintenanceLayoutTemplate,
            regions: {
                movementManeuverDifficultiesMaintenanceRegion: '#movementManeuverDifficultiesMaintenanceRegion',
                movementManeuverMaintenanceRegion: '#movementManeuverMaintenanceRegion'
            },
            initialize: function (options) {
                var self = this;
                self.movementManeuverDifficulties = options.movementManeuverDifficulties;
                self.selectedDifficulty = options.selectedDifficulty;
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultySelected', function (movementManeuverDifficultyModel) {
                    self.displayMovementManeuvers(movementManeuverDifficultyModel);
                });
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultyAdded', function (movementManeuverDifficultyModel) {
                    self.movementManeuverDifficultyAdded(movementManeuverDifficultyModel);
                });
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultyDeleted', function (movementManeuverDifficultyModel) {
                    self.movementManeuverDifficultyDeleted(movementManeuverDifficultyModel);
                });
                // self.movementManeuverDifficulties.on('all', self.handleCollectionEvents(self));
            },
            movementManeuverDifficulties: null,
            selectedDifficulty: null,
            myDifficultyView: null,
            myManeuverListView: null,
            onRender: function () {
                var self = this;
                var difficultyViewOptions = {
                    movementManeuverDifficulties: self.movementManeuverDifficulties,
                    selectedDifficulty: self.selectedDifficulty
                };
                self.myDifficultyView = new MovementManeuverDifficultiesMainteanceView(difficultyViewOptions);
                var listViewOptions = {
                    collection: self.criticalHitsForSelectedType,
                    selectedType: self.selectedType
                };
                var listView = new MovementManeuverMaintenanceListView(listViewOptions);

                this.showChildView('movementManeuverDifficultiesMaintenanceRegion', self.myDifficultyView);
                // this.showChildView('criticalHitsMaintenanceRegion', listView);
            },
            movementManeuverDifficultyAdded: function (movementManeuverDifficultyModel) {
                // a difficulty was added.  The collection should have been updated 
                // automatically.  Just need to set the selected difficulty to the one just
                // added and render.
                var self = this;
                self.selectedDifficulty = movementManeuverDifficultyModel;
                self.render();
            },
            movementManeuverDifficultyDeleted: function (movementManeuverDifficultyModel) {
                // a difficulty was deleted.  The collection should have been updated 
                // automatically.  Just need to set the selected difficulty to the one just
                // added and render.
                var self = this;
                self.selectedDifficulty = movementManeuverDifficulties.at(0);
                self.render();
            },
            displayMovementManeuvers: function (movementManeuverDifficultyModel) {
                var self = this;
                self.selectedDifficulty = criticalHitTypeString;
                // figure this out
            }
        });

        return MovementManeuverMaintenanceLayoutiew;

    });
