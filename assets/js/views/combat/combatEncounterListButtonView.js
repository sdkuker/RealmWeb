define(['marionette',
        'backbone',
        'realmApplication',
        'services/playerWarehouse',
    'tpl!templates/combat/combatEncounterListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerWarehouse, CombatEncounterListButtonTemplate) {

    var CombatEncounterListButtonView = Marionette.ItemView.extend({
        template: CombatEncounterListButtonTemplate,
        templateHelpers : function() {
            var changeButtonDescription = 'Allows you to change the characters in the combat - but only BEFORE ' 
                + 'combat has started.  Combat starts the FIRST TIME you click on the Open button!';
            var openButtonDescription = 'Starts the combat encounter.  Combat encounter characters CAN NOT ' 
                + 'be changed once combat has been started.  Combat starts the FIRST TIME you click on the '
                + 'open button!';
            return {
                changeButtonDescription : changeButtonDescription,
                openButtonDescription : openButtonDescription
            }
        },
        events : {
            'click #addButton' : 'addButtonClicked',
            'click #changeButton' : 'changeButtonClicked',
            'click #openButton' : 'openButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize: function(options) {
            this.listenTo(options.listView, 'openedEncounterSelected', this.openedEncounterSelected);
            this.listenTo(options.listView, 'unOpenedEncounterSelected', this.unOpenedEncounterSelected);
        },
        openedEncounterSelected : function() {
            self.encounterSelected = true;
            self.encounterIsOpen = true;
            self.render();
        },
        unOpenedEncounterSelected : function() {
            self.encounterSelected = true;
            self.encounterIsOpen = false;
            self.render();
        },
        onRender : function() {
            self = this;
            if (self.encounterSelected) {
                $('#openButton').prop('disabled', false);
                $('#deleteButton').prop('disabled', false);
                if (self.encounterIsOpen) {
                    $('#changeButton').prop('disabled', true);
                } else {
                    $('#changeButton').prop('disabled', false);
                }
            } else {
                $('#changeButton').prop('disabled', true);
                $('#openButton').prop('disabled', true);
                $('#deleteButton').prop('disabled', true);
            };
            if (! PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                $('#addButton').prop('disabled', true);
                $('#changeButton').prop('disabled', true);
                $('#deleteButton').prop('disabled', true);
            }
        },
        encounterSelected : false,
        encounterIsOpen : false,
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
