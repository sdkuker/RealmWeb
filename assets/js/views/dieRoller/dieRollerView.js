define(['jquery',
    'marionette',
    "tpl!templates/dieRoller/dieRoller.tpl",
    "models/dieRoller/dieModel"], function ($, Marionette, DieRollerTemplate, DieModel) {
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

        initialize : function() {
            self = this;
            $(document.body).on('change', '#nbrOfDice', function(e) {
                self.numberOfDiceChosen();
            })
        },

        numberOfDiceChosen : function() {
            self = this;
            self.numberOfDice = $('#nbrOfDice option:selected').val();
        },

        numberOfDice: 1,

        onRender: function() {
            self = this;
            $('#nbrOfDice').val(self.numberOfDice);
        },

        normalButtonClicked : function() {
            self = this;
            this.model.roll(self.numberOfDice);
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
