define(['marionette',
    "tpl!templates/player/playerListButtonTemplate.tpl"],
    function (Marionette, PlayerListButtonTemplate) {

    var PlayerListButtonView = Marionette.ItemView.extend({
        template: PlayerListButtonTemplate
    });

    return PlayerListButtonView;

});
