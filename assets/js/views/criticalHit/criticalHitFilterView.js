define(['marionette',
        'backbone',
        'realmApplication',
        "models/dieRoller/dieModel",
        'services/criticalHitWarehouse',
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, DieModel,CriticalHitWarehouse, CriticalHitFilterTemplate) {

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
            chosenCombatEncounter: null,
            chosenDefender : null,
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
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                $.when(CriticalHitWarehouse.getCriticalHitsForType(self.chosenType)).then (
                    function(criticalHitCollection) {
                        self.options.criticalHits = criticalHitCollection;
                        self.render();
                    },
                    function(errorString) {
                        console.log(errorString);
                    }
                )
            },
            severitySelected : function() {
                self = this;
                self.chosenSeverity = $('#severitySelect option:selected').val();
            },
            populateCombatEncounters : function() {
                self = this;
                var encounterSelectElement = this.$el.find('#combatEncounterSelect');
                encounterSelectElement.empty();
                this.options.combatEncounters.forEach(function(myEncounter, key, list) {
                    var appendString = "<option value='" + myEncounter.get('id') +  "'";
                    if ((key == 0 && ! self.chosenCombatEncounter) || (self.chosenCombatEncounter && self.chosenCombatEncounter == myEncounter.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.chosenCombatEncounter) {
                            self.chosenCombatEncounter = myEncounter.get('id');
                        }
                    };
                    appendString = appendString + ">" + myEncounter.get('description') + "</option>"
                    encounterSelectElement.append(appendString);
                });
            },
            populateDefenders : function() {

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
                for(severity in allSeverities) {
                    if (severity && severity != 'notSelectedType') {
                        severitySelectElement.append("<option value='" + severity + "'>" + severity + "</option>");
                    };
                };
                var firstSeveritySelectOption = severitySelectElement.find('option:first');
                firstSeveritySelectOption.attr('selected', true);
                this.chosenSeverity = firstSeveritySelectOption.val();

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
                var selectedCriticalHitArray = this.options.criticalHits.getCriticalHit(self.attackTotalValue, this.chosenType, this.chosenSeverity );
                if (selectedCriticalHitArray && selectedCriticalHitArray.length > 0) {
                    RealmApplication.vent.trigger('criticalHitFilter:criticalHitSelected', selectedCriticalHitArray);
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
