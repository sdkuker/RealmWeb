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
            this.listenTo(this.model, 'change', this.render);
       },
       encounterHasStarted : false,
        templateHelpers : function() {
            var checkboxName = this.model.get('id');
            var numberInCombatName = checkboxName.concat('nbrInCombat');
            var characterName = this.model.getCharacterName();
            var isCharacterActiveInEncounter = " ";
            if  (this.model.get('activeInEncounter')) {
                isCharacterActiveInEncounter = "checked";
            }
            var shouldDisable = " ";
            if (this.encounterHasStarted) {
                shouldDisable = "disabled";
            }
            var shouldDisableNbrInCombat = " ";
            var numberInCombat = this.model.get('numberInCombat');
            if ( isCharacterActiveInEncounter === ' ' ) {
                numberInCombat = 0;
                shouldDisableNbrInCombat = 'disabled';
            }
            return {
                checkboxName : checkboxName,
                numberInCombatName: numberInCombatName,
                decodedCharacterName : characterName,
                isCheckboxChecked : isCharacterActiveInEncounter,
                shouldDisable : shouldDisable,
                numberInCombat : numberInCombat,
                shouldDisableNbrInCombat: shouldDisableNbrInCombat
            }
        },
        characterActioned : function(event) {
            var self = this;
            if (event.target.name.includes('nbrInCombat')) {
                self.model.set('numberInCombat', event.target.value);
            } else {
                if (event.target.checked) {
                    self.model.set('activeInEncounter', true);
                    self.model.set('numberInCombat', 1);
                } else {
                    self.model.set('activeInEncounter', false);
                    self.model.set('numberInCombat', 0);
                }
            }
        }
    });

    return AddChangeCombatEncounterCharacterListItemView;

});
