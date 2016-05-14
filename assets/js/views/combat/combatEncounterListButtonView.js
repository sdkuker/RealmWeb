define(['marionette',
        'backbone',
        'realmApplication',
    'tpl!templates/combat/combatEncounterListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CombatEncounterListButtonTemplate) {

    var CombatEncounterListButtonView = Marionette.ItemView.extend({
        template: CombatEncounterListButtonTemplate,
        events : {
            'click #addButton' : 'addButtonClicked',
            'click #changeButton' : 'changeButtonClicked',
            'click #openButton' : 'openButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        addButtonClicked : function() {
            RealmApplication.vent.trigger('combatEncounterListAddButton:clicked');
        },
        changeButtonClicked : function() {
            RealmApplication.vent.trigger('combatEncounterListChangeButton:clicked');
        },
        openButtonClicked : function() {
            RealmApplication.vent.trigger('combatEncounterListOpenButton:clicked');
        },
        deleteButtonClicked : function() {
            RealmApplication.vent.trigger('combatEncounterListDeleteButton:clicked');
        },
    });

    return CombatEncounterListButtonView;

});
