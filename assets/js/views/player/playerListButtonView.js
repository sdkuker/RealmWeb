define(['marionette',
        'backbone',
        'realmApplication',
    'tpl!templates/player/playerListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerListButtonTemplate) {

    var PlayerListButtonView = Marionette.ItemView.extend({
        template: PlayerListButtonTemplate,
        events : {
            'click #addButton' : 'addButtonClicked',
            'click #changeButton' : 'changeButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        addButtonClicked : function() {
            RealmApplication.vent.trigger('playerListAddButton:clicked');
        },
        changeButtonClicked : function() {
            RealmApplication.vent.trigger('playerListChangeButton:clicked');
        },
        deleteButtonClicked : function() {
            RealmApplication.vent.trigger('playerListDeleteButton:clicked');
        },
    });

    return PlayerListButtonView;

});
