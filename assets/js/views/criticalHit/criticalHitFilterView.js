define(['marionette',
        'backbone',
        'realmApplication',
        "models/dieRoller/dieModel",
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, DieModel, CriticalHitFilterTemplate) {

        var CriticalHitFilterView = Marionette.ItemView.extend({
            template: CriticalHitFilterTemplate,
            criticalHits :null,
            events : {
                'click #normalDieButton' : 'normalDieButtonClicked',
                'click #openEndedDieButton' : 'openEndedDieButtonClicked',
            },
            chosenType : null,
            chosenSeverity : null,
            dieRollValue : 0,
            attackerBonusValue : 0,
            defenderBonusValue : 0,
            attackTotalValue : 0,
            dieInstance : null,
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
                self.dieInstance = new DieModel();
            },
            onRender : function() {
                var typeSelectElement = this.$el.find('#typeSelect');
                var allTypes = this.options.criticalHits.getAllTypes();
                for(type in allTypes) {
                    typeSelectElement.append("<option value='" + type + "'>" + type + "</option>");
                };

                var selectedType = $('#typeSelect option:selected').val();
                if (! selectedType) {
                    var firstSelectOption = typeSelectElement.find('option:first');
                    if (firstSelectOption) {
                        firstSelectOption.attr('selected', true);
                        this.chosenType = firstSelectOption.val();
                    }
                };
                this.populateSeverities();
                this.caclulateAttackTotal();
                $('#attackerBonus').val(self.attackerBonusValue);
                $('#defenderBonus').val(self.defenderBonusValue);
                $('#attackTotal').val(self.attackTotalValue);
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                self.populateSeverities();
            },
            severitySelected : function() {
                self = this;
                self.chosenSeverity = $('#severitySelect option:selected').val();
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
                self.render();
            },
            defenderBonusChanged : function() {
                self = this;
                self.defenderBonusValue = parseInt($('#defenderBonus').val(), 10);
                self.render();
            }
        });

        return CriticalHitFilterView;

    });
