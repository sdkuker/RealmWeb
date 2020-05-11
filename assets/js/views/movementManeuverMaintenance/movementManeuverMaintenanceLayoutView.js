define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceLayoutTemplate.tpl",
    'views/movementManeuverMaintenance/movementManeuverDifficutliesMaintenanceView',
    'views/movementManeuverMaintenance/movementManeuverMaintenanceListView',
    'services/movementManeuverWarehouse'],
    function (Marionette, RealmApplication, MovementManeuverMaintenanceLayoutTemplate, MovementManeuverDifficultiesMainteanceView,
        MovementManeuverMaintenanceListView,
        MovementManeuverWarehouse) {

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
                self.movementManeuversForSelectedDifficulty = options.movementManeuversForSelectedDifficulty;
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultySelected', function (movementManeuverDifficultyModel) {
                    self.displayMovementManeuvers(movementManeuverDifficultyModel);
                });
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultyAdded', function (movementManeuverDifficultyModel) {
                    self.movementManeuverDifficultyAdded(movementManeuverDifficultyModel);
                });
                this.listenTo(RealmApplication.vent, 'movementManeuverDifficultiesMaintenance:difficultyDeleted', function (movementManeuverDifficultyModel) {
                    self.movementManeuverDifficultyDeleted(movementManeuverDifficultyModel);
                });
                this.listenTo(RealmApplication.vent, 'movementManeuvereMaintenanceList:movementManeuverActioned', function() {
                    self.movementManeuverActioned();
                });
            },
            movementManeuverDifficulties: null,
            selectedDifficulty: null,
            myDifficultyView: null,
            myManeuverListView: null,
            movementManeuversForSelectedDifficulty: null,
            onRender: function () {
                var self = this;
                var difficultyViewOptions = {
                    movementManeuverDifficulties: self.movementManeuverDifficulties,
                    selectedDifficulty: self.selectedDifficulty
                };

                self.myDifficultyView = new MovementManeuverDifficultiesMainteanceView(difficultyViewOptions);
                var listView = new MovementManeuverMaintenanceListView();
                var listViewOptions = {
                    collection: self.movementManeuversForSelectedDifficulty,
                    selectedDifficulty: self.selectedDifficulty
                };
                var listView = new MovementManeuverMaintenanceListView(listViewOptions);

                this.showChildView('movementManeuverDifficultiesMaintenanceRegion', self.myDifficultyView);
                this.showChildView('movementManeuverMaintenanceRegion', listView);
            },
            movementManeuverDifficultyAdded: function (movementManeuverDifficultyModel) {
                // a difficulty was added.  The collection should have been updated 
                // automatically.  Just need to set the selected difficulty to the one just
                // added and render.
                var self = this;
                self.selectedDifficulty = movementManeuverDifficultyModel;
                $.when(self.updateManeuverCollection()).then(
                    function () {
                        self.render();
                    }
                )
            },
            movementManeuverDifficultyDeleted: function (movementManeuverDifficultyModel) {
                // a difficulty was deleted.  The collection should have been updated 
                // automatically.  Just need to set the selected difficulty to the one just
                // added and render.
                var self = this;
                self.selectedDifficulty = self.movementManeuverDifficulties.at(0);
                $.when(self.updateManeuverCollection()).then(
                    function () {
                        self.render();
                    }
                )
            },
            displayMovementManeuvers: function (movementManeuverDifficultyModel) {
                var self = this;
                self.selectedDifficulty = movementManeuverDifficultyModel;
                $.when(self.updateManeuverCollection()).then(
                    function () {
                        self.render();
                    }
                )
            },
            updateManeuverCollection: function () {
                var self = this;
                var deferred = $.Deferred();
                $.when(MovementManeuverWarehouse.getMovementManeuversForDifficultyWithDefaultForAdd(self.selectedDifficulty)).then(
                    function (maneuversForDifficulty) {
                        self.movementManeuversForSelectedDifficulty = maneuversForDifficulty;
                        deferred.resolve();
                    }
                )
                return deferred.promise();
            },
            movementManeuverActioned : function() {
                var self = this;
                self.render();
            }
        });

        return MovementManeuverMaintenanceLayoutiew;

    });
