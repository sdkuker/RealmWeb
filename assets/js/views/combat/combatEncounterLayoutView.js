define(['marionette',
        'views/combat/combatEncounterRoundStatisticsListView',
        'views/combat/combatEncounterButtonView',
        'tpl!templates/combat/combatEncounterLayoutTemplate.tpl',
        'services/combatRoundWarehouse', 'services/characterCombatRoundStatisticWarehouse'],
    function (Marionette, StatisticsView, ButtonView, CombatEncounterLayoutTemplate, CombatRoundWarehouse,
              ComatRoundStatisticsWarehouse) {

        var CombatEncounterLayoutiew = Marionette.LayoutView.extend({
            template: CombatEncounterLayoutTemplate,
            regions : {
                roundsTableRegion : '#roundsTableRegion',
                roundsButtonsRegion : '#roundsButtonsRegion'
            },
            templateHelpers : function() {
                var encounterDescription = this.encounter.getDescription();
                return {
                    encounterDescription : encounterDescription
                }
            },
            encounter : null,
            encounterRounds : null,
            roundToShow : null,
            roundIdentifierToShow : 0,
            roundStatistics : null,
            buttonsView : null,
            initialize : function(options) {
                self = this;
                self.encounter = options.encounter;
            },
            onRender: function() {
                var self = this;
                var statisticsView = new StatisticsView({collection: self.roundStatistics});
                var buttonsView = new ButtonView({model : this.encounter, roundIdentifierToShow : this.roundIdentifierToShow});
                this.listenTo(buttonsView, 'combatEncounterNextRoundButton:clicked', this.createAndDisplayNextRound);
                this.listenTo(buttonsView, 'combatEncounterRoundNumberToDisplay:selected', this.displayRoundNumber);
                this.showChildView('roundsTableRegion', statisticsView);
                this.showChildView('roundsButtonsRegion', buttonsView);
            },
            displayRoundNumber : function(roundNumberToDisplay) {
                var self = this;
                self.roundIdentifierToShow = roundNumberToDisplay;
                $.when(self.prepareToShowRound(self.roundIdentifierToShow)).then(
                    function() {
                        self.render();
                    }
                )
            },
            createAndDisplayNextRound : function() {
                var self = this;
                $.when( CombatRoundWarehouse.createNextCombatRoundsForEncounter(self.encounter)).then (
                    function(combatRoundCollection) {
                        $.when(self.prepareToShowRound(self.encounter.get('openRound'))).then (
                            function() {
                                self.render();
                            }
                        )
                    }
                )
            },
            prepareToShowRound : function(roundIdentifier) {
                var self = this;
                var deferred = $.Deferred();

                $.when(CombatRoundWarehouse.getCombatRoundsForEncounter(self.encounter)).then(
                    function(myEncounterRoundsCollection) {
                       self.selectRoundToShow(roundIdentifier, myEncounterRoundsCollection);
                        $.when(ComatRoundStatisticsWarehouse.getCombatRoundStatisticsForRound(self.roundToShow)).then (
                            function(statisticsCollection) {
                                self.roundStatistics = statisticsCollection;
                                deferred.resolve();
                            }
                        ), function(error1) {
                            console.log('some kind of error getting statistics');
                            deferred.fail();
                        }
                    }
                ),  function(error) {
                        console.log('some kind of error getting rounds');
                        deferred.fail();
                    };

                return deferred.promise();
            },
            selectRoundToShow: function(roundIdentifier, roundCollection) {
                var self = this;
                if (roundIdentifier == 'open') {
                    self.roundIdentifierToShow = self.encounter.get('openRound');
                } else {
                    self.roundIdentifierToShow = roundIdentifier;
                };
                self.roundToShow = roundCollection.find(function(round) {
                    return self.roundIdentifierToShow == round.get('roundNumber');
                });
            }
        });

        return CombatEncounterLayoutiew;

    });
