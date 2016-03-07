define(['marionette',
    'realmApplication',
    "tpl!templates/character/characterListItemTemplate.tpl",
    'models/character/characterModel'], function (Marionette, RealmApplication, CharacterListItemTemplate, CharacterModel) {
    var CharacterListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : CharacterModel,
        template: CharacterListItemTemplate,
        events : {
            'click' : 'characterSelected'
        },
        characterSelected : function(event) {
            RealmApplication.vent.trigger('characterListCharacterSelected', this, this.model);
        }
    });

    return CharacterListItemView;

});
