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
                self.displayedRound = options.model.get('openRound');
            },
            displayedRound : null,
            events : {
                'click #nextRoundButton' : 'nextRoundButtonClicked',
                'click #criticalHitsButton' : 'criticalHitsButtonClicked'
            },
            onRender : function() {
                var self = this;
                self.populateRounds();
            },
            nextRoundButtonClicked : function() {
                this.trigger('combatEncounterNextRoundButton:clicked');
            },
            criticalHitsButtonClicked : function() {
                RealmApplication.vent.trigger('criticalHitsButton:clicked');
            },
            populateRounds : function() {
                var self = this;
                var displayedRoundsSelectElement = this.$el.find('#displayedRound');
                displayedRoundsSelectElement.empty();
                var roundsSelectElement = null;
                for(index = 1; index <= this.model.get('openRound'); index ++) {
                    displayedRoundsSelectElement.append("<option value='" + index + "'>" + index + "</option>");
                };
               // var openSelectOption = displayedRoundsSelectElement.find('option:first');
                //displayedRoundsSelectElement.attr('selected', true);
                $('#displayedRound', this.$el ).val(self.displayedRound);

            },
        });

        return CombatEncounterButtonView;

    });
