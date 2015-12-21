define(['marionette',
    "tpl!templates/player/playerListLayoutTemplate.tpl"],
    function (Marionette, PlayerListLayoutTemplate) {

    var PlayerListLayoutiew = Marionette.LayoutView.extend({
        template: PlayerListLayoutTemplate,
        regions : {
            playerTableRegion : '#playerTableRegion',
            buttonsRegion : '#buttonsRegion'
        }
    });

    return PlayerListLayoutiew;

});
