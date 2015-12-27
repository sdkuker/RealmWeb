define(['marionette',
    'models/player/playerModel',
    'utility/viewUtilities',
    "tpl!templates/player/playerTemplate.tpl",
    'logger'], function (Marionette, PlayerModel, ViewUtilities, PlayerTemplate, Logger) {
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
                },
                function(error) {
                    Logger.logErrror("player model NOT successfully saved: " + error);
                }
            );
        }
    });

    return PlayerView;

});
