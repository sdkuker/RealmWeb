define(['marionette',
        'backbone',
        'realmApplication',
        'services/playerWarehouse',
    'tpl!templates/combat/combatEncounterListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerWarehouse, CombatEncounterListButtonTemplate) {

    var CombatEncounterListButtonView = Marionette.ItemView.extend({
        template: CombatEncounterListButtonTemplate,
        events : {
            'click #addButton' : 'addButtonClicked',
            'click #changeButton' : 'changeButtonClicked',
            'click #openButton' : 'openButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize: function(options) {
            this.listenTo(options.listView, 'encounterSelected', this.modelSelected);
        },
        modelSelected : function() {
            self.encounterSelected = true;
            self.render();
        },
        onRender : function() {
            self = this;
            if (self.encounterSelected) {
                $('#changeButton').prop('disabled', false);
                $('#openButton').prop('disabled', false);
                $('#deleteButton').prop('disabled', false);;
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
