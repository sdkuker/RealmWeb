define(['marionette',
    "tpl!templates/player/playerListTemplate.tpl",
    'views/player/playerListItemView'], function (Marionette, PlayerListTemplate, PlayerView) {
    var PlayerListView = Marionette.CompositeView.extend({
        template: PlayerListTemplate,
        childView : PlayerView,
        tagName : 'ul'
    });

    return PlayerListView;

});
