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
            this.listenTo(RealmApplication.vent, 'addChangeCombatEncounterCharacterActioned', function(tableRow, model) {
                self.combatEncounterCharacterActioned(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        combatEncounterCharacterActioned : function(tableRow, actionedModel) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            this.trigger('combatEncounterCharacterAddedOrRemoved', this, actionedModel);
        }
    });

    return AddChangeCombatEncounterCharacterListView;

});
