define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    'utility/viewUtilities',
    "tpl!templates/player/playerTemplate.tpl",
    'logger',
    'services/playerWarehouse'
], function (Marionette, RealmApplication, PlayerModel, ViewUtilities, PlayerTemplate, Logger, PlayerWarehouse) {
    var PlayerView = Marionette.ItemView.extend({
        template: PlayerTemplate,
        model: PlayerModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        saveButtonClicked : function() {
            self = this;
            var newName = $('#playerName').val();
            this.model.set('name', newName);
            // if it's a new model, add it to the collection
            if (! this.model.get('id')) {
                Logger.logInfo('About to add a new player model to the collection');
                PlayerWarehouse.getAllPlayers().add({name : newName});
            }
            // don't have to do anything if it's modifying an existing model -
            // firebase does that automatically
            ViewUtilities.showModalView('Informational', 'Player Saved');
            RealmApplication.vent.trigger('viewPlayerList');

        },
        deleteButtonClicked : function() {
            this.model.destroy().then(
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
