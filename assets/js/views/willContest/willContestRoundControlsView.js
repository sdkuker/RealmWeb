define(['marionette',
        'backbone',
        'realmApplication',
        'services/playerWarehouse',
        'tpl!templates/willContest/willContestRoundControlsTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerWarehouse,
              WillContestRoundControlsTemplate) {

        var WillContestRoundControlsView = Marionette.ItemView.extend({
            template: WillContestRoundControlsTemplate,
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
                    totalNumberOfRounds : this.options.totalNumberOfRounds
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

        return WillContestRoundControlsView;

    });
