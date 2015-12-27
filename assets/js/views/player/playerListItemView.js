define(['marionette',
    'realmApplication',
    "tpl!templates/player/playerListItemTemplate.tpl",
    'models/player/playerModel'], function (Marionette, RealmApplication, PlayerListItemTemplate, PlayerModel) {
    var PlayerListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : PlayerModel,
        template: PlayerListItemTemplate,
        events : {
            'click' : 'playerSelected'
        },
        playerSelected : function(event) {
            RealmApplication.vent.trigger('playerListPlayerSelected', this, this.model);
        }
    });

    return PlayerListItemView;

});
