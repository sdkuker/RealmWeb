define(['marionette',
    "tpl!templates/dieRoller/dieRoller.tpl",
    "models/dieRoller/dieModel"], function (Marionette, DieRollerTemplate, DieModel) {
    var DieRollerView = Marionette.ItemView.extend({
        template: DieRollerTemplate,
        model: DieModel,
        events: {
            'click #normalButton' : 'normalButtonClicked',
            'click #openEndedButton' : 'openEndedButtonClicked',
            'click #openEndedDownButton' : 'openEndedDownButtonClicked',
            'click #openEndedUpButton' : 'openEndedUpButtonClicked',
            'click #gmConfiguredButton' : 'gmConfiguredButtonClicked'
        },
        modelEvents: {'change': 'render'},

        normalButtonClicked : function() {
            console.log('normal button clicked');
            this.model.roll();
        },
        openEndedButtonClicked : function() {
            console.log('open ended button clicked');
        },
        openEndedDownButtonClicked : function() {
            console.log('open ended down button clicked');
        },
        openEndedUpButtonClicked : function() {
            console.log('open ended up button clicked');
        },
        gmConfiguredButtonClicked : function() {
            console.log('gm configured button clicked');
        }
    });

    return DieRollerView;

});
