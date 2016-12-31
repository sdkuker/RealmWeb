define(['marionette',
        'backbone',
        'realmApplication',
        "models/dieRoller/dieModel",
        'services/criticalHitWarehouse',
        'services/combatRoundWarehouse',
        'services/characterCombatRoundStatisticWarehouse',
        'services/combatRoundCriticalHitWarehouse',
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, DieModel,CriticalHitWarehouse,
              CombatRoundWarehouse, CombatRoundStatisticWarehouse, CombatRoundCriticalHitWarehouse,
              CriticalHitFilterTemplate) {

        var CriticalHitFilterView = Marionette.ItemView.extend({
            template: CriticalHitFilterTemplate,
            events : {
                'click #normalDieButton' : 'normalDieButtonClicked',
                'click #openEndedDieButton' : 'openEndedDieButtonClicked',
                'click #getCriticalButton' : 'getCriticalButtonClicked',
                'click #listCritcalsButton' : 'listCriticalButtonClicked'
            },
            chosenType : null,
            chosenSeverity : null,
            dieRollValue : 0,
            attackerBonusValue : 0,
            defenderBonusValue : 0,
            attackTotalValue : 0,
            dieInstance : null,
            chosenCombatEncounterID : null,
            chosenCombatEncounter : null,
            openCombatRoundForEncounter : null,
            chosenDefenderID : null,
            noCombatID : 'noCombatID',
            initialize : function() {
                self = this;
                $(document.body).on('change', '#typeSelect', function(e) {
                    self.typeSelected();
                });
                $(document.body).on('change', '#severitySelect', function(e) {
                    self.severitySelected();
                });
                $(document.body).on('change', '#attackerBonus', function(e) {
                    self.attackerBonusChanged();
                });
                $(document.body).on('change', '#defenderBonus', function(e) {
                    self.defenderBonusChanged();
                });
                $(document.body).on('change', '#combatEncounterSelect', function(e) {
                    self.combatEncounterSelected();
                });
                $(document.body).on('change', '#defenderSelect', function(e) {
                    self.defenderSelected();
                });
                self.dieInstance = new DieModel();
                if (this.options.combatEncounterID) {
                    self.chosenCombatEncounterID = this.options.combatEncounterID;
                    self.chosenCombatEncounter = self.getCombatEncounterWithID(self.chosenCombatEncounterID);
                    self.chosenDefenderID = this.options.characterID;
                };
            },
            onRender : function() {
                self = this;
                var typeSelectElement = this.$el.find('#typeSelect');
                typeSelectElement.empty();
                this.options.criticalHitTypes.forEach(function(myType, key, list) {
                    var appendString = "<option value='" + myType.get('id') +  "'";
                    if ((key == 0 && ! self.chosenType) || (self.chosenType && self.chosenType == myType.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.chosenType) {
                            self.chosenType = myType.get('id');
                        }
                   };
                   appendString = appendString + ">" + myType.get('id') + "</option>"
                   typeSelectElement.append(appendString);
                });
                this.populateCombatEncounters();
                this.populateDefenders();
                this.populateSeverities();
                this.caclulateAttackTotal();
                $('#rollResult').val(self.dieRollValue);
                $('#attackerBonus').val(self.attackerBonusValue);
                $('#defenderBonus').val(self.defenderBonusValue);
                $('#attackTotal').val(self.attackTotalValue);
                if (self.inCombatMode()) {
                    $('#listCritcalsButton').prop('disabled', true);
                } else {
                    $('#listCritcalsButton').prop('disabled', false);
                }
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                $.when(CriticalHitWarehouse.getCriticalHitsForType(self.chosenType)).then (
                    function(criticalHitCollection) {
                        self.options.criticalHits = criticalHitCollection;
                        self.chosenSeverity = null;
                        self.render();
                    },
                    function(errorString) {
                        console.log(errorString);
                    }
                )
            },
            combatEncounterSelected : function() {
                self = this;
                self.chosenCombatEncounterID = $('#combatEncounterSelect option:selected').val();
                self.chosenCombatEncounter = self.getCombatEncounterWithID(self.chosenCombatEncounterID);
                self.render();
                self.displayCombatCriticalHits((true));
            },
            severitySelected : function() {
                self = this;
                self.chosenSeverity = $('#severitySelect option:selected').val();
            },
            defenderSelected : function() {
                self = this;
                self.chosenDefenderID = $('#defenderSelect option:selected').val();
                self.displayCombatCriticalHits();
            },
            populateCombatEncounters : function() {
                var self = this;
                var encounterSelectElement = this.$el.find('#combatEncounterSelect');
                encounterSelectElement.empty();
                var noCombatOption = "<option value='" + self.noCombatID + "'";
                if (self.chosenCombatEncounterID == null || self.chosenCombatEncounterID == self.noCombatID) {
                    noCombatOption = noCombatOption + " selected='selected'";
                    self.chosenCombatEncounterID = self.noCombatID;
                };
                noCombatOption = noCombatOption + ">Exclude from Combat</option>";
                encounterSelectElement.append(noCombatOption);
                this.options.combatEncounters.forEach(function(myEncounter, key, list) {
                    var appendString = "<option value='" + myEncounter.get('id') +  "'";
                    if ((key == 0 && ! self.chosenCombatEncounterID) || (self.chosenCombatEncounterID && self.chosenCombatEncounterID == myEncounter.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.chosenCombatEncounterID) {
                            self.chosenCombatEncounterID = myEncounter.get('id');
                        }
                    };
                    appendString = appendString + ">" + myEncounter.get('description') + "</option>";
                    encounterSelectElement.append(appendString);
                });
            },
            getCombatEncounterWithID : function(combatEncounterID) {
                var self = this;
                var selectedEncounter = null;
                selectedEncounter = this.options.combatEncounters.findWhere({id: combatEncounterID});
                return selectedEncounter;
            },
            inCombatMode : function() {
                var self = this;
                return self.chosenCombatEncounterID && self.chosenCombatEncounterID != self.noCombatID;
            },
            populateDefenders : function() {
                var self = this;
                var defenderSelectElement = this.$el.find('#defenderSelect');
                defenderSelectElement.empty();
                if (self.inCombatMode()) {
                    $.when(CombatRoundWarehouse.getOpenRoundForEncounter(self.chosenCombatEncounter)).then (
                        function(openCombatRound) {
                            self.openCombatRoundForEncounter = openCombatRound;
                            $.when(CombatRoundStatisticWarehouse.getCombatRoundStatisticsForRound(openCombatRound)).then(
                                function(combatRoundStatisticsCollection) {
                                    combatRoundStatisticsCollection.forEach(function(aStatistic, key, list){
                                        var optionString = "<option value='" + aStatistic.get('characterID') + "'";
                                        if ((key == 0 && ! self.chosenDefenderID) || (self.chosenDefenderID && self.chosenDefenderID == aStatistic.get('characterID'))) {
                                            optionString = optionString + " selected='selected'";
                                            if (! self.chosenDefenderID) {
                                                self.chosenDefenderID = aStatistic.get('characterID');
                                            }
                                        };
                                        optionString = optionString + ">" + decodeURI(aStatistic.get('characterName')) + "</option";
                                        defenderSelectElement.append(optionString);
                                    });
                                    self.displayCombatCriticalHits();
                                },
                                function(errorString) {
                                    console.log(errorString);
                                }
                            )
                        },
                        function(errorString) {
                            console.log(errorString);
                        }
                    )
                }
            },
            populateSeverities : function() {
                var severitySelectElement = this.$el.find('#severitySelect');
                severitySelectElement.empty();
                var allSeverities = null;
                if (this.chosenType) {
                    allSeverities = this.options.criticalHits.getSeveritiesForType(this.chosenType);
                } else {
                    allSeverities = this.options.criticalHits.getAllSeverities();
                };
                var optionSelected = false;
                for(severity in allSeverities) {
                    if (severity && severity != 'notSelectedType') {
                        var optionString = "<option value='" + severity + "'";
                        if (severity == this.chosenSeverity) {
                            optionString = optionString + " selected='selected'";
                            optionSelected = true;
                        }
                        optionString = optionString + ">" + severity + "</option>";
                        severitySelectElement.append(optionString);
                    };
                };
                if (! optionSelected) {
                    var firstSeveritySelectOption = severitySelectElement.find('option:first');
                    firstSeveritySelectOption.attr('selected', true);
                    this.chosenSeverity = firstSeveritySelectOption.val();
                }

            },
            normalDieButtonClicked : function() {
                self = this;
                self.dieInstance.roll(1);
                self.dieRollValue = self.dieInstance.get('currentRoll');
                self.render();
            },
            openEndedDieButtonClicked : function() {
                self = this;
                self.dieInstance.rollOpenEnded(1);
                self.dieRollValue = self.dieInstance.get('currentRoll');
                self.render();
            },
            caclulateAttackTotal : function() {
                self = this;
                self.attackTotalValue = self.dieRollValue + self.attackerBonusValue - self.defenderBonusValue;
            },
            attackerBonusChanged : function() {
                self = this;
                self.attackerBonusValue = parseInt($('#attackerBonus').val(), 10);
                if (Number.isNaN(self.attackerBonusValue)) {
                    self.attackerBonusValue = 0;
                };
                self.render();
            },
            defenderBonusChanged : function() {
                self = this;
                self.defenderBonusValue = parseInt($('#defenderBonus').val(), 10);
                if (Number.isNaN(self.defenderBonusValue)) {
                    self.defenderBonusValue = 0;
                };
                self.render();
            },
            getCriticalButtonClicked : function () {
                var selectedCriticalHitArray = this.options.criticalHits.getCriticalHit(self.attackTotalValue,
                    this.chosenType, this.chosenSeverity );
                if (selectedCriticalHitArray && selectedCriticalHitArray.length > 0) {
                    if (self.inCombatMode()) {
                        var openRoundID = self.openCombatRoundForEncounter.get('id');
                        var openRoundNumber = self.openCombatRoundForEncounter.get('roundNumber');
                        var criticalHitID = selectedCriticalHitArray[0].get('id');
                        var criticalHitDescription = selectedCriticalHitArray[0].getDescription();
                        $.when(CombatRoundCriticalHitWarehouse.addCombatRoundCriticalHit(self.chosenCombatEncounterID,
                            openRoundID, openRoundNumber, self.chosenDefenderID, criticalHitID, criticalHitDescription)).then (
                            function(newCombatRoundCriticalHit) {
                                self.displayCombatCriticalHits();
                            },
                            function(errorString) {
                                console.log(errorString);
                            }
                        )
                    } else {
                        RealmApplication.vent.trigger('criticalHitFilter:criticalHitSelected', selectedCriticalHitArray);
                    }
                }
            },
            displayCombatCriticalHits : function(overrideCombatMode) {
                if (self.inCombatMode() || overrideCombatMode) {
                    $.when(CombatRoundCriticalHitWarehouse.getCombatRoundCriticalHitsForCharacterForEncounter(self.chosenDefenderID, self.chosenCombatEncounterID)).then(
                        function (arrayOfCombatRoundCriticalHits) {
                            RealmApplication.vent.trigger('criticalHitFilter:combatCriticalHitSelected', arrayOfCombatRoundCriticalHits);
                        },
                        function (errorString) {
                            console.log(errorString);
                        }
                    )
                }
            },
            listCriticalButtonClicked : function () {
                var selectedCriticalHitArray = this.options.criticalHits.getCriticalHitList(this.chosenType, this.chosenSeverity );
                if (selectedCriticalHitArray && selectedCriticalHitArray.length > 0) {
                    RealmApplication.vent.trigger('criticalHitFilter:criticalHitSelected', selectedCriticalHitArray);
                }
            }
        });

        return CriticalHitFilterView;

    });
