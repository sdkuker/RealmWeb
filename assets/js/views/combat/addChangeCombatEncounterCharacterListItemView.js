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
            var checkboxName = this.model.get('id');
            var characterName = this.model.getCharacterName();
            return {
                checkboxName : checkboxName,
                decodedCharacterName : characterName
            }
        },
        characterActioned : function(event) {
            if (event.target.checked) {
                RealmApplication.vent.trigger('addChangeCombatEncounterCharacterChecked', this, this.model);
            } else {
                RealmApplication.vent.trigger('addChangeCombatEncounterCharacterUnchecked', this, this.model);
            }
        }
    });

    return AddChangeCombatEncounterCharacterListItemView;

});
