define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/combat/combatEncounterListSortTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterListSortTemplate) {

        var combatEncounterListSortView = Marionette.ItemView.extend({
            template: CombatEncounterListSortTemplate,
            events : {
                'click #initiativeRadioButton' : 'initiativeRadioButtonClicked',
                'click #characterNameRadioButton' : 'characterNameRadioButtonClicked'
            },
            sortSelected: 'initiative',
            initiativeRadioButtonClicked : function() {
                self = this;
                self.sortSelected = 'initiative';
                RealmApplication.vent.trigger('initiativeRadioButton:clicked');
            },
            characterNameRadioButtonClicked : function() {
                self = this;
                self.sortSelected = 'characterName';
                RealmApplication.vent.trigger('characterNameRadioButton:clicked');
            }
        });

        return combatEncounterListSortView;

    });
