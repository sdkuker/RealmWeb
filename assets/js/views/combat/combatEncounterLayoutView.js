define(['marionette',
        'views/combat/combatEncounterRoundStatisticsListView',
        'views/combat/combatEncounterButtonView',
        "tpl!templates/combat/combatEncounterLayoutTemplate.tpl"],
    function (Marionette, StatisticsView, ButtonView, CombatEncounterLayoutTemplate) {

        var CombatEncounterLayoutiew = Marionette.LayoutView.extend({
            template: CombatEncounterLayoutTemplate,
            regions : {
                roundsTableRegion : '#roundsTableRegion',
                roundsButtonsRegion : '#roundsButtonsRegion'
            },
            encounter : null,
            initialize : function(options) {
                self = this;
                self.encounter = options.encounter;
            },
            onShow: function() {
                this.showChildView('roundsTableRegion', new StatisticsView({encounter: this.encounter, round : 'open'}));
                this.showChildView('roundsButtonsRegion', new ButtonView({model : this.encounter}));

            }
        });

        return CombatEncounterLayoutiew;

    });
