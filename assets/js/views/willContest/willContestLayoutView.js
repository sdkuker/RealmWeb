define(['marionette',
        'views/willContest/willContestContestantsView',
        'views/willContest/willContestRoundControlsView',
        // 'views/willContest/willContestDisplayedRoundView',
        'models/willContest/willContestModel',
        'tpl!templates/willContest/willContestLayoutTemplate.tpl',
        'services/willContestWarehouse'],
    function (Marionette, WillContestContestantsView, WillContestRoundControlView,
              WillContestModel, WillContestLayoutTemplate, WillContestWarehouse) {

        var WillContestLayoutiew = Marionette.LayoutView.extend({
            template: WillContestLayoutTemplate,
            regions : {
                contestantsRegion : '#contestantsRegion',
                roundControlsRegion : '#roundControlsRegion',
                displayedRoundRegion : '#displayedRoundRegion'
            },
            model: WillContestModel,
            roundNumberToShow : 1,
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
                var roundControlsView = new WillContestRoundControlView({currentRound: this.roundNumberToShow, totalNumberOfRounds: 10});
                // var displayedRoundsView = new WillContestDisplayedRoundView({model : this.willContest, roundIdentifierToShow : this.roundIdentifierToShow});
                this.listenTo(roundControlsView, 'willContestRoundControlsPreviousButton:clicked', this.displayPreviousRound);
                this.listenTo(roundControlsView, 'willContestRoundControlsNextButton:clicked', this.displayNextRound);
                this.listenTo(roundControlsView, 'willContestRoundControlsCreateNextRoundButton:clicked', this.createAndDisplayNextRound);
                this.showChildView('contestantsRegion', contestantsView);
                this.showChildView('roundControlsRegion', roundControlsView);
            //     this.showChildView('displayedRoundRegion', displayedRoundsView);
             },
            displayPreviousRound : function() {
                var self = this;
                if (self.roundNumberToShow > 1) {
                    self.roundNumberToShow --;
                    self.render();
                }
                // $.when(self.prepareToShowRound(self.roundIdentifierToShow)).then(
                //     function() {
                //         self.render();
                //     }
                // )
            },
            displayNextRound : function() {
                var self = this;
                if (self.roundNumberToShow < 11) {
                    self.roundNumberToShow ++;
                    self.render();
                }
                // $.when(self.prepareToShowRound(self.roundIdentifierToShow)).then(
                //     function() {
                //         self.render();
                //     }
                // )
            },
            createAndDisplayNextRound : function() {
                var self = this;
            //     $.when( CombatRoundWarehouse.createNextCombatRoundsForEncounter(self.encounter)).then (
            //         function(combatRoundCollection) {
            //             $.when(self.prepareToShowRound(self.encounter.get('openRound'))).then (
            //                 function() {
            //                     self.render();
            //                 }
            //             )
            //         }
            //     )
            },
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
