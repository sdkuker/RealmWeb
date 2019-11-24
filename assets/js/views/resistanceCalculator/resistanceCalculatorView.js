define(['marionette',
        'backbone',
        'realmApplication',
        'domain/resistanceCalculator/resistanceCalculator',
        'tpl!templates/resistanceCalculator/resistanceCalculatorTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, ResistanceCalculator,
              ResistanceCalculatorTemplate) {

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
                this.calculateResistance();
                $('#attackerLevelInput').val(self.attackerLevel);
                $('#targetLevelInput').val(self.targetlevel);
            },
            calculateResistance : function() {
                self = this;
                self.targetResistsAt = ResistanceCalculator.calculateRollRequiredToResistAttack(self.attackerLevel, self.targetlevel);
            },
            attackerLevelChanged : function() {
                self = this;
                self.attackerLevel = parseInt($('#attackerLevelInput').val(), 10);
                if (Number.isNaN(self.attackerLevel)) {
                    self.attackerLevel = 0;
                };
                self.render();
            },
            targetLevelChanged : function() {
                self = this;
                self.targetlevel = parseInt($('#targetLevelInput').val(), 10);
                if (Number.isNaN(self.targetlevel)) {
                    self.targetlevel = 0;
                };
                self.render();
            },
        });

        return ResistanceCalculatorView;

    });
