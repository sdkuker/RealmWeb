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
            var isCharacterActiveInEncounter = " ";
            if  (this.model.get('activeInEncounter')) {
                isCharacterActiveInEncounter = "checked";
            }
            return {
                checkboxName : checkboxName,
                decodedCharacterName : characterName,
                isCheckboxChecked : isCharacterActiveInEncounter
            }
        },
        characterActioned : function(event) {
            var self = this;
            if (event.target.checked) {
                self.model.set('activeInEncounter', true);
                RealmApplication.vent.trigger('addChangeCombatEncounterCharacterChecked', this, this.model);
            } else {
                self.model.set('activeInEncounter', false);
                RealmApplication.vent.trigger('addChangeCombatEncounterCharacterUnchecked', this, this.model);
            }
        }
    });

    return AddChangeCombatEncounterCharacterListItemView;

});
