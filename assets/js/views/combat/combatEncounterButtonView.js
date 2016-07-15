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
            },
            events : {
                'click #nextRoundButton' : 'nextRoundButtonClicked',
                'click #criticalHitsButton' : 'criticalHitsButtonClicked'
            },
            nextRoundButtonClicked : function() {
                RealmApplication.vent.trigger('combatEncounterNextRoundButton:clicked');
            },
            criticalHitsButtonClicked : function() {
                RealmApplication.vent.trigger('criticalHitsButton:clicked');
            },
        });

        return CombatEncounterButtonView;

    });
