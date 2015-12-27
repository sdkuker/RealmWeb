define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    'utility/viewUtilities',
    "tpl!templates/player/playerTemplate.tpl",
    'logger'], function (Marionette, RealmApplication, PlayerModel, ViewUtilities, PlayerTemplate, Logger) {
    var PlayerView = Marionette.ItemView.extend({
        template: PlayerTemplate,
        model: PlayerModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        saveButtonClicked : function() {
            self = this;
            var name = $('#playerName').val();
            this.model.set('name', name);
            Logger.logInfo('About to save a player model');
            this.model.save().then(
                function(playerModel) {
                    Logger.logInfo('player model successfully saved');
                    ViewUtilities.showModalView('Informational', 'Player Saved');
                    RealmApplication.vent.trigger('viewPlayerList');
                },
                function(error) {
                    Logger.logErrror("player model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Saving the Player.  See the log');
                }
            );
        }
    });

    return PlayerView;

});
