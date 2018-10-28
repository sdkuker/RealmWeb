define(['marionette',
        'backbone',
        'realmApplication',
        'models/willContest/willContestRoundModel',
        'services/playerWarehouse',
        'tpl!templates/willContest/willContestRoundsTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, WillContestRoundModel, PlayerWarehouse,
              WillContestRoundsTemplate) {

        var WillContestRoundsView = Marionette.ItemView.extend({
            template: WillContestRoundsTemplate,
            model : WillContestRoundModel,
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
                    roundToShow : this.options.roundToShow ? this.options.roundToShow.get('roundNumber') : 0,
                    totalNumberOfRounds : this.options.numberOfWillContestRounds,
                    contestantOneTotalWill : this.options.roundToShow ? this.options.roundToShow.get('contestantOneTotalWill') : '',
                    contestantOneTotalWillDescription : this.options.roundToShow ? this.options.roundToShow.get('contestantOneTotalWillDescription') : '',
                    contestantTwoTotalWill : this.options.roundToShow ? this.options.roundToShow.get('contestantTwoTotalWill') : '',
                    contestantTwoTotalWillDescription : this.options.roundToShow ? this.options.roundToShow.get('contestantTwoTotalWillDescription') : '',
                    permanentModifier : this.options.roundToShow ? this.options.roundToShow.get('consequencePermanentModifier') : '',
                    temporaryModifier : this.options.roundToShow ? this.options.roundToShow.get('consequenceTemporaryModifier') : '',
                    temporaryModifierExpirationRound : this.options.roundToShow ? this.options.roundToShow.get('consequenceTemporaryModifierExpirationRound') : '',
                    consequence : this.options.roundToShow ? this.options.roundToShow.get('consequenceDescription') : ''
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
                self.trigger('willContestRoundsPreviousButton:clicked');
            },
            nextButtonClicked : function() {
                self = this;
                self.trigger('willContestRoundsNextButton:clicked');
            },
            createNextRoundButtonClicked : function() {
                self = this;
                self.trigger('willContestRoundsCreateNextRoundButton:clicked');
            }
        });

        return WillContestRoundsView;

    });
