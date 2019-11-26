define(['marionette',
        'backbone',
        'realmApplication',
        'domain/resistanceCalculator/resistanceCalculator',
        'models/resistanceCalculator/resistanceCalculatorResultModel',
        'tpl!templates/resistanceCalculator/resistanceCalculatorTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, ResistanceCalculator,
              ResistanceCalculatorResultModel, ResistanceCalculatorTemplate) {

        var ResistanceCalculatorView = Marionette.ItemView.extend({
            template: ResistanceCalculatorTemplate,
            events : {
                'change #attackerLevelInput' : 'attackerLevelChanged',
                'change #targetLevelInput' : 'targetLevelChanged'
            },
            attackerLevel : 0,
            targetlevel : 0,
            targetResistsAt : 0,
            initialize : function() {
                self = this;
            },
            templateHelpers : function() {
                 return {
                     targetResistsAt : this.targetResistsAt
                }
            },
            onRender : function() {
                self = this;
                $('#attackerLevelInput').val(self.attackerLevel);
                $('#targetLevelInput').val(self.targetlevel);
            },
            calculateResistance : function() {
                self = this;
                self.targetResistsAt = ResistanceCalculator.calculateRollRequiredToResistAttack(self.attackerLevel, self.targetlevel);

                var myModel = new ResistanceCalculatorResultModel();
                myModel.setAttackerLevel(self.attackerLevel);
                myModel.setTargetLevel(self.targetlevel);
                myModel.setTargetResistsAt(self.targetResistsAt);
                RealmApplication.vent.trigger('resistanceCalculatorView:resistanceCalculationComputed', myModel);
            },
            attackerLevelChanged : function() {
                self = this;
                self.attackerLevel = parseInt($('#attackerLevelInput').val(), 10);
                if (Number.isNaN(self.attackerLevel)) {
                    self.attackerLevel = 0;
                };
                this.calculateResistance();
                self.render();
            },
            targetLevelChanged : function() {
                self = this;
                self.targetlevel = parseInt($('#targetLevelInput').val(), 10);
                if (Number.isNaN(self.targetlevel)) {
                    self.targetlevel = 0;
                };
                this.calculateResistance();
                self.render();
            },
        });

        return ResistanceCalculatorView;

    });
