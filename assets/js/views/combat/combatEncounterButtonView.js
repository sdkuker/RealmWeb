define(['marionette',
        'backbone',
        'realmApplication',
        'models/combat/combatEncounterModel',
        'services/playerWarehouse',
        'tpl!templates/combat/combatEncounterButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterModel, PlayerWarehouse,
              CombatEncounterButtonTemplate) {

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
                'click #deleteRoundButton' : 'deleteRoundButtonClicked',
                'change #displayedRoundNumber' : 'displayedRoundNumberSelected'
            },
            onRender : function() {
                var self = this;
                if (! PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                    $('#nextRoundButton', this.el).prop('disabled', true);
                }

                if (PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                    if (self.displayedRoundNumber == self.model.get('openRound')) {
                        $('#deleteRoundButton', this.el).prop('disabled', false);
                    } else {
                        $('#deleteRoundButton', this.el).prop('disabled', true);
                    }
                } else {
                    $('#deleteRoundButton', this.el).prop('disabled', true);
                }

                self.populateRounds();
            },
            nextRoundButtonClicked : function() {
                this.trigger('combatEncounterNextRoundButton:clicked');
            },
            deleteRoundButtonClicked : function() {
                this.trigger('combatEncounterDeleteRoundButton:clicked');
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
