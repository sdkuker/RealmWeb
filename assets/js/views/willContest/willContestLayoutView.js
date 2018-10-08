define(['marionette',
        'views/willContest/willContestContestantsView',
        // 'views/willContest/willContestRoundControlsView',
        // 'views/willContest/willContestDisplayedRoundView',
        'models/willContest/willContestModel',
        'tpl!templates/willContest/willContestLayoutTemplate.tpl',
        'services/willContestWarehouse'],
    function (Marionette, WillContestContestantsView,
              WillContestModel, WillContestLayoutTemplate, WillContestWarehouse) {

        var WillContestLayoutiew = Marionette.LayoutView.extend({
            template: WillContestLayoutTemplate,
            regions : {
                contestantsRegion : '#contestantsRegion',
                roundControlsRegion : '#roundControlsRegion',
                displayedRoundRegion : '#displayedRoundRegion'
            },
            model: WillContestModel,
            roundToShow : null,
            roundIdentifierToShow : 0,
            contestantsView : null,
            roundControlsView : null,
            displayedRoundView : null,
            allWillContenstants : null,
            initialize : function(options) {
                self = this;
                self.allWillContenstants = options.allWillContenstants;
            },
            onRender: function() {
                var self = this;
                var contestantsView = new WillContestContestantsView({model : this.model, allWillContenstants: self.allWillContenstants});
            //     var roundControlsView = new WillContestRoundControlsView();
            //     var displayedRoundsView = new WillContestDisplayedRoundView({model : this.willContest, roundIdentifierToShow : this.roundIdentifierToShow});
            //     this.listenTo(contestantsView, 'willContestContestantOne:selected', this.contestandOneSelected);
            //     this.listenTo(contestantsView, 'willContestContestantTwo:selected', this.contestantTwoSelected);
            //     this.listenTo(roundControlsView, 'willContestNextRoundButton:clicked', this.createAndDisplayNextRound);
            //     this.listenTo(roundControlsView, 'willContestRoundNumberToDisplay:selected', this.displayRoundNumber);
                this.showChildView('contestantsRegion', contestantsView);
            //     this.showChildView('roundControlsRegion', roundControlsView);
            //     this.showChildView('displayedRoundRegion', displayedRoundsView);
             },
            // displayRoundNumber : function(roundNumberToDisplay) {
            //     var self = this;
            //     self.roundIdentifierToShow = roundNumberToDisplay;
            //     $.when(self.prepareToShowRound(self.roundIdentifierToShow)).then(
            //         function() {
            //             self.render();
            //         }
            //     )
            // },
            // createAndDisplayNextRound : function() {
            //     var self = this;
            //     $.when( CombatRoundWarehouse.createNextCombatRoundsForEncounter(self.encounter)).then (
            //         function(combatRoundCollection) {
            //             $.when(self.prepareToShowRound(self.encounter.get('openRound'))).then (
            //                 function() {
            //                     self.render();
            //                 }
            //             )
            //         }
            //     )
            // },
            // prepareToShowRound : function(roundIdentifier) {
            //     var self = this;
            //     var deferred = $.Deferred();
            //
            //     $.when(WillContestWarehouse.getRoundsForContest(self.willContest)).then(
            //         function(myWillContestRoundsCollection) {
            //             self.selectRoundToShow(roundIdentifier, myWillContestRoundsCollection);
            //             deferred.resolve();
            //         }
            //     ),  function(error) {
            //         console.log('some kind of error getting rounds');
            //         deferred.fail();
            //     };
            //
            //     return deferred.promise();
            // },
            // selectRoundToShow: function(roundIdentifier, roundCollection) {
            //     var self = this;
            //     if (roundIdentifier == 'open') {
            //         self.roundIdentifierToShow = self.encounter.get('openRound');
            //     } else {
            //         self.roundIdentifierToShow = roundIdentifier;
            //     };
            //     self.roundToShow = roundCollection.find(function(round) {
            //         return self.roundIdentifierToShow == round.get('roundNumber');
            //     });
            // }
        });

        return WillContestLayoutiew;

    });
