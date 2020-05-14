define(['marionette',
    'backbone',
    'realmApplication',
    "models/dieRoller/dieModel",
    'services/movementManeuverWarehouse',
    'utility/viewUtilities',
    'tpl!templates/movementManeuver/movementManeuverFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, DieModel, MovementManeuverWarehouse,
        ViewUtilities, MovementManeuverFilterTemplate) {

        var MovementManeuverFilterView = Marionette.ItemView.extend({
            template: MovementManeuverFilterTemplate,
            events: {
                'click #openEndedDieButton': 'openEndedDieButtonClicked',
                'click #getManeuverButton': 'getManeuverButtonClicked',
                'change #difficultySelect': 'difficultySelected',
                'change #rollAdjustment': 'rollAdjustmentChanged',
                'change #rollResult': 'rollResultChanged'
            },
            selectedDifficulty: null,
            dieRollValue: 0,
            rollAdjustmentValue: 0,
            rollTotalValue: 0,
            dieInstance: null,
            movementManeuverDifficulties: null,
            initialize: function (options) {
                var self = this;
                self.dieInstance = new DieModel();
                self.movementManeuverDifficulties = options.movementManeuverDifficulties;
                self.selectedDifficulty = options.selectedDifficulty
            },
            onRender: function () {
                var self = this;
                var difficultySelectElement = this.$el.find('#difficultySelect');
                difficultySelectElement.empty();
                for (index = 0; index < self.movementManeuverDifficulties.length; index++) {
                    var myDifficulty = self.movementManeuverDifficulties.at(index);
                    var appendString = "<option value='" + myDifficulty.get('id') + "'";
                    if ((!self.selectedDifficulty) || (self.selectedDifficulty && self.selectedDifficulty == myDifficulty)) {
                        appendString = appendString + " selected='selected'";
                        if (!self.selectedDifficulty) {
                            self.selectedDifficulty = myDifficulty;
                        }
                    };
                    appendString = appendString + ">" + myDifficulty.get('difficultyDescription') + "</option>"
                    difficultySelectElement.append(appendString);
                }

                this.caclulateAttackTotal();
                $('#rollResult').val(self.dieRollValue);
                $('#rollAdjustment').val(self.rollAdjustmentValue);
                $('#rollTotal').val(self.rollTotalValue);
            },
            difficultySelected: function () {
                var self = this;
                var selectedDifficultyID = $('#difficultySelect option:selected').val();
                self.selectedDifficulty = self.movementManeuverDifficulties.findWhere({'id': selectedDifficultyID});
            },
            openEndedDieButtonClicked: function () {
                var self = this;
                self.dieInstance.rollOpenEnded(1);
                self.dieRollValue = self.dieInstance.get('currentRoll');
                self.render();
            },
            caclulateAttackTotal: function () {
                var self = this;
                self.rollTotalValue = self.dieRollValue + self.rollAdjustmentValue;
            },
            rollAdjustmentChanged: function () {
                var self = this;
                self.rollAdjustmentValue = parseInt($('#rollAdjustment').val(), 10);
                if (Number.isNaN(self.rollAdjustmentValue)) {
                    self.rollAdjustmentValue = 0;
                };
                self.render();
            },
            rollResultChanged: function () {
                var self = this;
                self.dieRollValue = parseInt($('#rollResult').val(), 10);
                if (Number.isNaN(self.dieRollValue)) {
                    self.dieRollValue = 0;
                };
                self.render();
            },
            getManeuverButtonClicked: function () {
                var self = this;
                if (self.selectedDifficulty) {
                    $.when(MovementManeuverWarehouse.getMovementManeuversForDifficulty(self.selectedDifficulty)).then(
                        function (collectionOfManeuversForSelectedDifficulty) {
                            var selectedMovementManeuver = collectionOfManeuversForSelectedDifficulty.getManeuverForRoll(self.rollTotalValue);
                            if (selectedMovementManeuver) {
                                var selectedData = { model: selectedMovementManeuver, difficulty: self.selectedDifficulty.get('difficultyDescription'), rollValue: self.rollTotalValue };
                                RealmApplication.vent.trigger('movementManeuverFilter:movementManeuverSelected', selectedData);
                            } else {
                                ViewUtilities.showModalView("Informational", 'No maneuver was found for difficulty: ' + self.selectedDifficulty.get('difficultyDescription') + ' and roll: ' + self.rollTotalValue);
                            }
                        }
                    )
                } else {
                    ViewUtilities.showModalView("Warning", 'A difficulty must be selected before you can get a maneuver for it');
                }
            },
            displayCombatMovementManeuvers: function (overrideCombatMode) {

                var deferred = $.Deferred();

                if (self.inCombatMode() || overrideCombatMode) {
                    $.when(CombatRoundMovementManeuverWarehouse.getCombatRoundMovementManeuversForCharacterForEncounter(self.chosenDefenderID, self.chosenCombatEncounterID)).then(
                        function (arrayOfCombatRoundMovementManeuvers) {
                            deferred.resolve();
                            RealmApplication.vent.trigger('movementManeuverFilter:combatMovementManeuverSelected', arrayOfCombatRoundMovementManeuvers);
                        },
                        function (errorString) {
                            console.log(errorString);
                            deferred.reject();
                        }
                    )
                }
                return deferred.promise();

            },
            listCriticalButtonClicked: function () {
                var selectedMovementManeuverArray = this.options.movementManeuvers.getMovementManeuverList(this.chosenType, this.chosenSeverity);
                if (selectedMovementManeuverArray && selectedMovementManeuverArray.length > 0) {
                    RealmApplication.vent.trigger('movementManeuverFilter:movementManeuverSelected', selectedMovementManeuverArray);
                }
            }
        });

        return MovementManeuverFilterView;

    });
