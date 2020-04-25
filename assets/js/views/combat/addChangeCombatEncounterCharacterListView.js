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
        childViewOptions(model) {
            return {
                encounterHasStarted: this.encounterHasStarted
            }
        },
        encounterHasStarted : false,
        initialize : function(options) {
            var self = this;
            this.listenTo(this.collection, 'add', this.render);
            self.encounterHasStarted = options.encounterHasStarted;
        },
    });

    return AddChangeCombatEncounterCharacterListView;

});
