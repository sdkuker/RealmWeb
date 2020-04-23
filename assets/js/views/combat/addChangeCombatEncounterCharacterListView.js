define(['marionette',
    'realmApplication',
    'logger',
    'tpl!templates/combat/addChangeCombatEncounterCharacterListTemplate.tpl',
    'views/combat/addChangeCombatEncounterCharacterListItemView'],
    function (Marionette, RealmApplication, Logger,
                AddChangeCombatEncounterCharacterListTemplate, 
                AddChangeCombatEncounterCharacterListItemView) 
                {
    var AddChangeCombatEncounterCharacterListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'combatEncounterCharacterTable',
        className : 'table table-striped',
        template: AddChangeCombatEncounterCharacterListTemplate,
        childView : AddChangeCombatEncounterCharacterListItemView,
        childViewContainer : 'tbody',
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'addChangeCombatEncounterCharacterChecked', function(tableRow, model) {
                self.combatEncounterCharacterChecked(tableRow, model);
            });
            this.listenTo(RealmApplication.vent, 'addChangeCombatEncounterCharacterUnchecked', function(tableRow, model) {
                self.combatEncounterCharacterUnchecked(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        combatEncounterCharacterChecked : function(tableRow, actionedModel) {
            RealmApplication.vent.trigger('combatEncounterCharacterChecked', actionedModel);
        },
        combatEncounterCharacterUnchecked : function(tableRow, actionedModel) {
            RealmApplication.vent.trigger('combatEncounterCharacterUnchecked', actionedModel);
        }
    });

    return AddChangeCombatEncounterCharacterListView;

});
