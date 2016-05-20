define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/combat/combatEncounterButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterButtonTemplate) {

        var CombatEncounterButtonView = Marionette.ItemView.extend({
            template: CombatEncounterButtonTemplate,
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
