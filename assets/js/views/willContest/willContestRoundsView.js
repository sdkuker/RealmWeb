define(['marionette',
        'backbone',
        'realmApplication',
        'services/playerWarehouse',
        'tpl!templates/willContest/willContestRoundsTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerWarehouse,
              WillContestRoundsTemplate) {

        var WillContestRoundsView = Marionette.ItemView.extend({
            template: WillContestRoundsTemplate,
            events : {
                'click #previousButton' : 'previousButtonClicked',
                'click #nextButton' : 'nextButtonClicked',
                'click #createNextRoundButton' : 'createNextRoundButtonClicked'
            },
            initialize : function() {
                self = this;
            },
            templateHelpers : function() {
                return {
                    currentRound : this.options.currentRound,
                    totalNumberOfRounds : this.options.totalNumberOfRounds,
                    contestantOneTotalWill : 10,
                    contestantTwoTotalWill : 20,
                    permanentModifier : 30,
                    temporaryModifier : 40,
                    temporaryModifierExpirationRound : 3,
                    consequence : 'this is the consequence of whatever happened.'
                }
            },
            onRender : function() {
                self = this;
                if (PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                    $('#createNextRoundButton', this.$el).prop('disabled', false);
                } else {
                    $('#createNextRoundButton', this.$el).prop('disabled', true);
                }
            },
            previousButtonClicked : function() {
                self = this;
                self.trigger('willContestRoundControlsPreviousButton:clicked');
            },
            nextButtonClicked : function() {
                self = this;
                self.trigger('willContestRoundControlsNextButton:clicked');
            },
            createNextRoundButtonClicked : function() {
                self = this;
                self.trigger('willContestRoundControlsCreateNextRoundButton:clicked');
            }
        });

        return WillContestRoundsView;

    });
