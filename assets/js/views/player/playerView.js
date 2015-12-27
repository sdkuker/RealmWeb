define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    'models/modal/modalModel',
    'views/modal/modalView',
    "tpl!templates/player/playerTemplate.tpl",
    'logger'], function (Marionette, RealmApplication, PlayerModel, ModalModel,  ModalView, PlayerTemplate, Logger) {
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
                    var modalModel = new ModalModel({severity: 'Informational', message : 'Player Saved'});
                    var modalView = new ModalView({model : modalModel});
                    RealmApplication.regions.modalRegion.show(modalView);

                },
                function(error) {
                    Logger.logErrror("player model NOT successfully saved: " + error);
                }
            );
        }
    });

    return PlayerView;

});
