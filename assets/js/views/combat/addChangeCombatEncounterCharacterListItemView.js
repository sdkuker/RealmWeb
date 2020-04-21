define(['marionette',
    'realmApplication',
    'tpl!templates/combat/addChangeCombatEncounterCharacterListItemTemplate.tpl',
    'models/combat/CombatEncounterCharacterModel'], function (Marionette, RealmApplication, AddChangeCombatEncounterListItemTemplate, CombatEncounterCharacter) {
    var AddChangeCombatEncounterCharacterListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : CombatEncounterCharacter,
        template: AddChangeCombatEncounterListItemTemplate,
        events : {
            'click' : 'characterActioned'
        },
        templateHelpers : function() {
            var checkboxName = this.model.getCharacterName();
            var characterName = this.model.getCharacterName();
            return {
                checkboxName : checkboxName,
                decodedCharacterName : characterName
            }
        },
        characterActioned : function(event) {
            RealmApplication.vent.trigger('addChangeCombatEncounterCharacterActioned', this, this.model);
        }
    });

    return AddChangeCombatEncounterCharacterListItemView;

});
