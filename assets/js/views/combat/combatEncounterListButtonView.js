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
        initialize: function() {
            var self = this;
            RealmApplication.vent.bind('combatEnconterList:encounterSelected', function () {
                self.encounterSelected = true;
                self.render();
            });
        },
        onRender : function() {
            self = this;
            if (self.encounterSelected) {
                $('#changeButton').removeAttr('disabled');
                $('#openButton').removeAttr('disabled');
                $('#deleteButton').removeAttr('disabled');
            }
        },
        encounterSelected : false,
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
