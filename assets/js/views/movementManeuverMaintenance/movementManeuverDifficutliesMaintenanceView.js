define(['marionette',
        'backbone',
        'realmApplication',
        'utility/viewUtilities',
        'services/movementManeuverDifficultyWarehouse',
        'tpl!templates/movementManeuverMaintenance/movementManeuverDifficutliesMaintenanceView.tpl'],
    function (Marionette, Backbone, RealmApplication, ViewUtilities, MovementManeuverDifficultyWarehouse,
        MovementManeuverDifficutliesMaintenanceTemplate) {

        var MovementManeuverDifficutliesMaintenanceView = Marionette.ItemView.extend({
            template: MovementManeuverDifficutliesMaintenanceTemplate,
            events : {
                'click #addDifficultyButton' : 'addDifficultyButtonClicked',
                'click #updateDifficultyButton' : 'updateDifficultyButtonClicked',
                'click #deleteDifficultyButton' : 'deleteDifficultyButtonClicked',
                'click #verifyLevelButton' : 'verifyLevelButtonClicked',
                'change #difficultySelect' : 'difficultySelected'
            },
            selectedDifficulty : null,
            initialize : function(options) {
                self = this;
                self.selectedDifficulty = options.selectedDifficulty;
                self.listenTo(self.options.movementManeuverDifficulties, 'add', self.render);
                self.listenTo(self.options.movementManeuverDifficulties, 'remove', self.render);
            },
            onRender : function() {
                var self = this;
                var difficultySelectElement = this.$el.find('#difficultySelect');
                difficultySelectElement.empty();
                self.options.movementManeuverDifficulties.forEach(function(myDifficulty, key, list) {
                    var appendString = "<option value='" + myDifficulty.get('id') +  "'";
                    if ((key == 0 && ! self.selectedDifficulty) || (self.selectedDifficulty && self.selectedDifficulty == myDifficulty.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.selectedDifficulty) {
                            self.selectedDifficulty = myDifficulty.get('id');
                        }
                    };
                    appendString = appendString + ">" + myDifficulty.get('id') + "</option>"
                    difficultySelectElement.append(appendString);
                });
                if (self.selectedDifficulty) {
                    if (self.options.movementManeuverDifficulties && self.options.movementManeuverDifficulties.length > 1) {
                        $('#deleteDifficultyButton', this.$el).prop('disabled', true);
                    } else {
                        $('#deleteDifficultyButton', this.$el).prop('disabled', false);
                    }
                } else {
                    $('#deleteDifficultyButton', this.$el).prop('disabled', true);
                }
            },
            difficultySelected : function() {
                self = this;
                self.selectedDifficulty = $('#difficultySelect option:selected').val();
                RealmApplication.vent.trigger('movementManeuverDifficultiesMaintenance:difficultySelected', self.selectedDifficulty);
            },
            addDifficultyButtonClicked : function(event ) {
                var newDifficultyName = $('#newDifficulty').val();
                var newDifficultyLevel = $('#newDifficultyLevel').val();
                if (newDifficultyName) {
                    $.when(MovementManeuverDifficultyWarehouse.addMovementManeuverDifficulty({id: newDifficultyName})).then (
                        function() {
                            ViewUtilities.showModalView('Information', 'Type ' + newDifficultyName + ' was added.');
                            self.selectedDifficulty = newDifficultyName;
                            RealmApplication.vent.trigger('movementManeuverDifficultiesMaintenance:difficultyAdded', self.selectedDifficulty);
                        }
                    )
                } else {
                    ViewUtilities.showModalView('Error', 'You must specify the difficulty name and level before clicking Add');
                }
            },
            deleteDifficultyButtonClicked : function() {
                self = this;
                if (self.selectedDifficulty) {
                    $.when(MovementManeuverDifficultyWarehouse.removeMovementManeuverDifficulty(self.selectedDifficulty)).then (
                        function() {
                            ViewUtilities.showModalView('Information', 'Difficulty ' + self.selectedDifficulty.get('difficultyDescription') + ' was deleted.');
                            self.selectedDifficulty = self.options.movementManeuverDifficulties.at(0);
                            RealmApplication.vent.trigger('movementManeuverDifficultiesMaintenance:difficultyDeleted', self.selectedDifficulty);
                        }
                    )
                } else {
                    ViewUtilities.showModalView('Error', 'You must choose a difficulty before clicking Delete');
                }
            },
            updateDifficultyButtonClicked : function() {
                self = this;
            },
            verifyLevelButtonClicked : function() {
                self = this;
            }
        });

        return MovementManeuverDifficutliesMaintenanceView;

    });
