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
        initialize: function(options){
            this.encounterHasStarted = options.encounterHasStarted;
       },
       encounterHasStarted : false,
        templateHelpers : function() {
            var checkboxName = this.model.get('id');
            var characterName = this.model.getCharacterName();
            var isCharacterActiveInEncounter = " ";
            if  (this.model.get('activeInEncounter')) {
                isCharacterActiveInEncounter = "checked";
            }
            var shouldDisable = " ";
            if (this.encounterHasStarted) {
                shouldDisable = "disabled";
            }
            return {
                checkboxName : checkboxName,
                decodedCharacterName : characterName,
                isCheckboxChecked : isCharacterActiveInEncounter,
                shouldDisable : shouldDisable
            }
        },
        characterActioned : function(event) {
            var self = this;
            if (event.target.checked) {
                self.model.set('activeInEncounter', true);
            } else {
                self.model.set('activeInEncounter', false);
            }
        }
    });

    return AddChangeCombatEncounterCharacterListItemView;

});
