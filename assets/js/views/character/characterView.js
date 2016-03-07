define(['marionette',
    'realmApplication',
    'models/character/characterModel',
    'utility/viewUtilities',
    "tpl!templates/character/characterTemplate.tpl",
    'logger',
    'services/characterWarehouse'
], function (Marionette, RealmApplication, CharacterModel, ViewUtilities, CharacterTemplate, Logger, CharacterWarehouse) {
    var PlayerView = Marionette.ItemView.extend({
        template: CharacterTemplate,
        model: CharacterModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        saveButtonClicked : function() {
            self = this;
            var newName = $('#characterName').val();
            this.model.set('name', newName);
            // if it's a new model, add it to the collection
            if (! this.model.get('id')) {
                Logger.logInfo('About to add a new character model to the collection');
                $.when(CharacterWarehouse.getAllCharacters()).then(
                    function(myCharacterCollection) {
                        myCharacterCollection.add({name : newName});
                        ViewUtilities.showModalView('Informational', 'Character Saved');
                        RealmApplication.vent.trigger('viewCharacterList');
                    }
                ),
                    function() {
                        console.log('some kind of error getting players for addition of character');
                    }
            } else {
                // don't have to do anything if it's modifying an existing model -
                // firebase does that automatically
                ViewUtilities.showModalView('Informational', 'Character Saved');
                RealmApplication.vent.trigger('viewCharacterList');
            }

        },
        deleteButtonClicked : function() {
            this.model.destroy().then(
                function(characterModel) {
                    Logger.logInfo('character model successfully saved');
                    ViewUtilities.showModalView('Informational', 'Character Saved');
                    RealmApplication.vent.trigger('viewCharacterList');
                },
                function(error) {
                    Logger.logErrror("character model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Saving the Character.  See the log');
                }
            );
        }
    });

    return PlayerView;

});
