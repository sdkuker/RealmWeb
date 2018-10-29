define(['marionette',
        'views/willContest/willContestContestantsView',
        'views/willContest/willContestRoundsView',
        'utility/viewUtilities',
        'models/willContest/willContestModel',
        'tpl!templates/willContest/willContestLayoutTemplate.tpl',
        'services/willContestWarehouse'],
    function (Marionette, WillContestContestantsView, WillContestRoundsView, ViewUtilities,
              WillContestModel, WillContestLayoutTemplate, WillContestWarehouse) {

        var WillContestLayoutView = Marionette.LayoutView.extend({
            template: WillContestLayoutTemplate,
            regions: {
                contestantsRegion: '#contestantsRegion',
                roundsRegion: '#roundsRegion'
            },
            model: WillContestModel,
            roundNumberToShow: 1,
            roundToShow: null,
            roundIdentifierToShow: 0,
            contestantsView: null,
            roundControlsView: null,
            displayedRoundView: null,
            allWillContenstants: null,
            willContestRounds: null,
            initialize: function (options) {
                self = this;
                self.allWillContenstants = options.allWillContenstants;
                self.willContestRounds = options.willContestRounds;
                if (self.willContestRounds && self.willContestRounds.length > 0 ) {
                    self.roundToShow = self.willContestRounds.last();
                    self.roundNumberToShow = self.roundToShow.get('roundNumber');
                }
            },
            onRender: function () {
                var self = this;
                var contestantsView = new WillContestContestantsView({
                    model: self.model,
                    allWillContenstants: self.allWillContenstants
                });
                var roundView = new WillContestRoundsView({
                    model: self.model,
                    numberOfWillContestRounds: self.model.id ? self.willContestRounds.length : 0,
                    roundToShow : self.model.id ? self.roundToShow : null,
                });
                this.listenTo(roundView, 'willContestRoundsPreviousButton:clicked', self.displayPreviousRound);
                this.listenTo(roundView, 'willContestRoundsNextButton:clicked', self.displayNextRound);
                this.listenTo(roundView, 'willContestRoundsCreateNextRoundButton:clicked', self.createAndDisplayNextRound);
                this.showChildView('contestantsRegion', contestantsView);
                this.showChildView('roundsRegion', roundView);
            },
            displayPreviousRound: function () {
                var self = this;
                if (self.roundNumberToShow > 1) {
                    self.roundNumberToShow--;
                    $.when(self.prepareToShowRound(self.roundNumberToShow)).then(
                        function () {
                            self.render();
                        }
                    )
                }

            },
            displayNextRound: function () {
                var self = this;
                if (self.roundNumberToShow < self.willContestRounds.length) {
                    self.roundNumberToShow++;
                    $.when(self.prepareToShowRound(self.roundNumberToShow)).then(
                        function () {
                            self.render();
                        }
                    )
                }
            },
            createAndDisplayNextRound: function () {
                var self = this;
                if (self.model.get('contestantOneID') === self.model.get('contestantTwoID')) {
                    ViewUtilities.showModalView('Error', 'The will contestants must be different');
                } else {
                    $.when(WillContestWarehouse.generateNextWillContestRound(self.model)).then(
                        function (nextWillContestRoundCreationReturn) {
                            if (nextWillContestRoundCreationReturn.newContestModel) {
                                // a new contest model was created, must refresh this layout view
                                self.model = nextWillContestRoundCreationReturn.newContestModel;
                            }
                            $.when(self.prepareToShowRound(self.model.get('currentRoundNumber'))).then(
                                function () {
                                    self.render();
                                }
                            )
                        },
                        function(aRejectReason) {
                            ViewUtilities.showModalView('Error', 'Unable to generate contest round because: ' + aRejectReason);
                        }
                    )
                }
            },
            prepareToShowRound: function (roundNumber) {
                var self = this;
                var deferred = $.Deferred();

                $.when(WillContestWarehouse.getRoundsForWillContest(self.model.id)).then(
                    function (myWillContestRoundsCollection) {
                        self.willContestRounds = myWillContestRoundsCollection;
                        self.selectRoundToShow(roundNumber);
                        deferred.resolve();
                    }
                ), function (error) {
                    console.log('some kind of error getting rounds');
                    deferred.fail();
                };

                return deferred.promise();
            },
            selectRoundToShow: function (roundNumber) {
                var self = this;
                if (roundNumber == 'open') {
                    self.roundNumberToShow = self.model.get('currentRoundNumber');
                } else {
                    self.roundNumberToShow = roundNumber;
                }
                ;
                self.roundToShow = self.willContestRounds.find(function (round) {
                    return self.roundNumberToShow == round.get('roundNumber');
                });
            }
        });

        return WillContestLayoutView;

    });
