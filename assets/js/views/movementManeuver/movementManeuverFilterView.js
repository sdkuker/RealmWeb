define(['marionette',
        'backbone',
        'realmApplication',
        "models/dieRoller/dieModel",
        'services/movementManeuverWarehouse',
        'utility/viewUtilities',
        'tpl!templates/movementManeuver/movementManeuverFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, DieModel,MovementManeuverWarehouse,
              ViewUtilities, MovementManeuverFilterTemplate) {

        var MovementManeuverFilterView = Marionette.ItemView.extend({
            template: MovementManeuverFilterTemplate,
            events : {
                'click #openEndedDieButton' : 'openEndedDieButtonClicked',
                'click #getManeuverButton' : 'getManeuverButtonClicked',
                'change #difficultySelect' : 'difficultySelected',
                'change #rollAdjustment' : 'rollAdjustmentChanged'
            },
            chosenDifficulty : null,
            dieRollValue : 0,
            rollAdjustmentValue : 0,
            rollTotalValue : 0,
            dieInstance : null,
            initialize : function() {
                var self = this;
                self.dieInstance = new DieModel();
            },
            onRender : function() {
                var self = this;
                var difficultySelectElement = this.$el.find('#difficultySelect');
                difficultySelectElement.empty();
                for (index = 0; index < this.options.movementManeuverDifficulties.length; index++) {
                    var myDifficulty = this.options.movementManeuverDifficulties[index];
                    var appendString = "<option value='" + myDifficulty.id +  "'";
                    if ((! self.chosenDifficulty) || (self.chosenDifficulty && self.chosenDifficulty == myDifficulty.id)) {
                        appendString = appendString + " selected='selected'";
                        if (! self.chosenDifficulty) {
                            self.chosenDifficulty = myDifficulty.id;
                        }
                    };
                    appendString = appendString + ">" + myDifficulty.description + "</option>"
                    difficultySelectElement.append(appendString);
                }

                this.caclulateAttackTotal();
                $('#rollResult').val(self.dieRollValue);
                $('#rollAdjustment').val(self.rollAdjustmentValue);
                $('#rollTotal').val(self.rollTotalValue);
                // if (self.inCombatMode()) {
                //     $('#listCritcalsButton', this.$el).prop('disabled', true);
                //     $('#navToCombatButton', this.$el).prop('disabled', false);
                // } else {
                //     $('#listCritcalsButton', this.$el).prop('disabled', false);
                //     $('#navToCombatButton', this.$el).prop('disabled', true);
                // }
            },
            difficultySelected : function() {
                var self = this;
                self.chosenDifficulty = $('#difficultySelect option:selected').val();
            },
            openEndedDieButtonClicked : function() {
                var self = this;
                self.dieInstance.rollOpenEnded(1);
                self.dieRollValue = self.dieInstance.get('currentRoll');
                self.render();
            },
            caclulateAttackTotal : function() {
                var self = this;
                self.rollTotalValue = self.dieRollValue + self.rollAdjustmentValue;
            },
            rollAdjustmentChanged : function() {
                var self = this;
                self.rollAdjustmentValue = parseInt($('#rollAdjustment').val(), 10);
                if (Number.isNaN(self.rollAdjustmentValue)) {
                    self.rollAdjustmentValue = 0;
                };
                self.render();
            },
            getManeuverButtonClicked : function () {
                var self = this;
                var selectedMovementManeuver = self.options.movementManeuvers.getManeuverForRoll(self.rollTotalValue);
                if (selectedMovementManeuver) {
                    var result;
                    if (selectedMovementManeuver && self.chosenDifficulty) {
                        switch (self.chosenDifficulty) {
                            case 'trivial':
                                result = selectedMovementManeuver.getTrivialManeuverResult();
                                break;
                            case 'routine' :
                                result = selectedMovementManeuver.getRoutineManeuverResult();
                                break;
                            case 'easy' :
                                result = selectedMovementManeuver.getEasyManeuverResult();
                                break;
                            case 'light' :
                                result = selectedMovementManeuver.getLightManeuverResult();
                                break;
                            case 'medium' :
                                result = selectedMovementManeuver.getMediumManeuverResult();
                                break;
                            case 'hard' :
                                result = selectedMovementManeuver.getHardManeuverResult();
                                break;
                            case 'veryHard' :
                                result = selectedMovementManeuver.getVeryHardManeuverResult();
                                break;
                            case 'extremelyHard' :
                                result = selectedMovementManeuver.getExtremelyHardManeuverResult();
                                break;
                            case 'sheerFolly' :
                                result = selectedMovementManeuver.getSheerFollyManeuverResult();
                                break;
                            case 'absurd' :
                                result = selectedMovementManeuver.getAbsurdManeuverResult();
                                break;
                            case 'insane' :
                                result = selectedMovementManeuver.getInsaneManeuverResult();
                                break;
                            case 'phenomenal' :
                                result = selectedMovementManeuver.getPhenomenalManeuverResult();
                                break;
                            case 'virtuallyImpossible' :
                                result = selectedMovementManeuver.getVirtuallyImpossibleManeuverResult();
                                break;
                        }
                        ;
                        var selectedData = {model: selectedMovementManeuver, result: result};

                        RealmApplication.vent.trigger('movementManeuverFilter:movementManeuverSelected', selectedData);

                    }
                } else {
                    ViewUtilities.showModalView("Informational", 'No maneuver exists for roll total: ' + self.rollTotalValue);
                }

            },
            displayCombatMovementManeuvers : function(overrideCombatMode) {

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
            listCriticalButtonClicked : function () {
                var selectedMovementManeuverArray = this.options.movementManeuvers.getMovementManeuverList(this.chosenType, this.chosenSeverity );
                if (selectedMovementManeuverArray && selectedMovementManeuverArray.length > 0) {
                    RealmApplication.vent.trigger('movementManeuverFilter:movementManeuverSelected', selectedMovementManeuverArray);
                }
            }
        });

        return MovementManeuverFilterView;

    });
