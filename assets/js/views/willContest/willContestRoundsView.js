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
                    currentRoundNumber : this.model.get('currentRoundNumber'),
                    totalNumberOfRounds : this.options.numberOfWillContestRounds,
                    contestantOneTotalWill : this.options.roundToShow ? this.options.roundToShow.get('contestantOneTotalWill') : '',
                    contestantTwoTotalWill : this.options.roundToShow ? this.options.roundToShow.get('contestantTwoTotalWill') : '',
                    permanentModifier : this.options.roundToShow ? this.options.roundToShow.get('contestantOnePermanentModifier') : '',
                    temporaryModifier : this.options.roundToShow ? this.options.roundToShow.get('contestantOneTemporaryModifier') : '',
                    temporaryModifierExpirationRound : this.options.roundToShow ? this.options.roundToShow.get('contestantOneTemporaryModifierExpirationRound') : '',
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
