define(['marionette',
    "tpl!templates/player/playerListTemplate.tpl",
    'views/player/playerListItemView'], function (Marionette, PlayerListTemplate, PlayerView) {
    var PlayerListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'playerTable',
        className : 'table table-striped',
        template: PlayerListTemplate,
        childView : PlayerView,
        childViewContainer : 'tbody'
    });

    return PlayerListView;

});
