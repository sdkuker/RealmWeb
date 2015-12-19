define(['marionette',
    "tpl!templates/player/playerListItemTemplate.tpl",
    'models/player/playerModel'], function (Marionette, PlayerListItemTemplate, PlayerModel) {
    var PlayerListItemView = Marionette.ItemView.extend({
        tagName : 'li',
        model : PlayerModel,
        template: PlayerListItemTemplate
    });

    return PlayerListItemView;

});
