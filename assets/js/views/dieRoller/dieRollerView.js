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

        numberOfDice: 1,

        gmConfiguredNbrOfSides: 1,

        initialize : function() {
            self = this;
            $(document.body).on('change', '#nbrOfDice', function(e) {
                self.numberOfDiceChosen();
            });
            $(document.body).on('change', '#gmConfigNbrSides', function(e) {
                self.gmConfiguredNbrOfSidesChosen();
            });
        },

        numberOfDiceChosen : function() {
            self = this;
            self.numberOfDice = $('#nbrOfDice option:selected').val();
        },

        gmConfiguredNbrOfSidesChosen : function() {
            self = this;
            self.gmConfiguredNbrOfSides = $('#gmConfigNbrSides option:selected').val();
        },

        onRender: function() {
            self = this;
            $('#nbrOfDice').val(self.numberOfDice);
            $('#gmConfigNbrSides').val(self.gmConfiguredNbrOfSides);
        },

        normalButtonClicked : function() {
            self = this;
            this.model.roll(self.numberOfDice);
        },
        openEndedButtonClicked : function() {
            self = this;
            this.model.rollOpenEnded(self.numberOfDice);
        },
        openEndedDownButtonClicked : function() {
            self = this;
            this.model.rollOpenEndedDown(self.numberOfDice);
        },
        openEndedUpButtonClicked : function() {
            self = this;
            this.model.rollOpenEndedUp(self.numberOfDice);
        },
        gmConfiguredButtonClicked : function() {
            self = this;
            this.model.rollGmConfigured(self.numberOfDice, self.gmConfiguredNbrOfSides);

        }
    });

    return DieRollerView;

});
