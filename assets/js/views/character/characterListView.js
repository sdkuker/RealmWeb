define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/character/characterModel',
    "tpl!templates/character/characterListTemplate.tpl",
    'views/character/characterListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, CharacterModel, CharacterListTemplate, CharacterView  ) {
    var CharacterListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'characterTable',
        className : 'table table-striped',
        template: CharacterListTemplate,
        childView : CharacterView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            self = this;
            this.listenTo(RealmApplication.vent, 'characterListAddButton:clicked', function() {
                self.triggerAddCharacterFunction();
            });
            this.listenTo(RealmApplication.vent, 'characterListChangeButton:clicked', function() {
                self.triggerEditCharacterFunction();
            });
            this.listenTo(RealmApplication.vent, 'characterListDeleteButton:clicked', function() {
                self.triggerDeleteCharacterFunction();
            });
            this.listenTo(RealmApplication.vent, 'characterListCharacterSelected', function(tableRow, model) {
                self.characterSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        triggerAddCharacterFunction : function() {
            RealmApplication.vent.trigger('characterListAddCharacter', new CharacterModel());
        },
        triggerEditCharacterFunction : function() {
            self = this;
            RealmApplication.vent.trigger('characterListChangeCharacter', self.selectedModel);
        },
        triggerDeleteCharacterFunction : function() {
            this.collection.remove(selectedModel);
            Logger.logInfo('character model deleted');
            ViewUtilities.showModalView('Informational', 'Character named: ' + selectedModel.getName() + ' Deleted');
            selectedModel = null;
            RealmApplication.vent.trigger('viewCharacterList');
        },
        characterSelected : function(tableRow, model) {
            self = this;
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            self.selectedModel = model;
        }
    });

    return CharacterListView;

});
