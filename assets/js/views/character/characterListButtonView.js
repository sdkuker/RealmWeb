define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/character/characterListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CharacterListButtonTemplate) {

        var CharacterListButtonView = Marionette.ItemView.extend({
            template: CharacterListButtonTemplate,
            events : {
                'click #addButton' : 'addButtonClicked',
                'click #changeButton' : 'changeButtonClicked',
                'click #deleteButton' : 'deleteButtonClicked'
            },
            addButtonClicked : function() {
                RealmApplication.vent.trigger('characterListAddButton:clicked');
            },
            changeButtonClicked : function() {
                RealmApplication.vent.trigger('characterListChangeButton:clicked');
            },
            deleteButtonClicked : function() {
                RealmApplication.vent.trigger('characterListDeleteButton:clicked');
            },
        });

        return CharacterListButtonView;

    });
