define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/character/characterListSortTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CharacterListSortTemplate) {

        var CharacterListSortView = Marionette.ItemView.extend({
            template: CharacterListSortTemplate,
            events : {
                'click #initiativeRadioButton' : 'initiativeRadioButtonClicked',
                'click #playerRadioButton' : 'playerRadioButtonClicked'
            },
            sortSelected: 'initiative',
            initiativeRadioButtonClicked : function() {
                self = this;
                self.sortSelected = 'initiative';
                RealmApplication.vent.trigger('initiativeRadioButton:clicked');
            },
            playerRadioButtonClicked : function() {
                self = this;
                self.sortSelected = 'player';
                RealmApplication.vent.trigger('playerRadioButton:clicked');
            }
        });

        return CharacterListSortView;

    });
