define(['marionette',
        'backbone',
        'realmApplication',
        'models/combat/combatEncounterModel',
        'tpl!templates/combat/combatEncounterButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterModel, CombatEncounterButtonTemplate) {

        var CombatEncounterButtonView = Marionette.ItemView.extend({
            template: CombatEncounterButtonTemplate,
            model: CombatEncounterModel,
            initialize : function(options) {
                self = this;
                if (options.roundIdentifierToShow == 'open') {
                    self.displayedRoundNumber = options.model.get('openRound');
                } else {
                    self.displayedRoundNumber = options.roundIdentifierToShow;
                }

            },
            displayedRoundNumber : null,
            events : {
                'click #nextRoundButton' : 'nextRoundButtonClicked',
                'click #criticalHitsButton' : 'criticalHitsButtonClicked',
                'change #displayedRoundNumber' : 'displayedRoundNumberSelected'
            },
            onRender : function() {
                var self = this;
                self.populateRounds();
            },
            nextRoundButtonClicked : function() {
                this.trigger('combatEncounterNextRoundButton:clicked');
            },
            criticalHitsButtonClicked : function() {
                var self = this;
                RealmApplication.vent.trigger('combatCriticalHitsForEncounterDefender', self.model.get('id'));
            },
            displayedRoundNumberSelected : function(event) {
                var self = this;
                self.displayedRoundNumber = $('#displayedRoundNumber option:selected').val();
                this.trigger('combatEncounterRoundNumberToDisplay:selected', self.displayedRoundNumber);
            },
            populateRounds : function() {
                var self = this;
                var displayedRoundNumberSelectElement = this.$el.find('#displayedRoundNumber');
                displayedRoundNumberSelectElement.empty();
                for(index = 1; index <= this.model.get('openRound'); index ++) {
                    displayedRoundNumberSelectElement.append("<option value='" + index + "'>" + index + "</option>");
                };
                $('#displayedRoundNumber', this.$el ).val(self.displayedRoundNumber);

            },
        });

        return CombatEncounterButtonView;

    });
