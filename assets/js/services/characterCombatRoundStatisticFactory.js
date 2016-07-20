define(['jquery',
        'logger',
        'models/combat/characterCombatRoundStatisticModel',
        'collections/combat/characterCombatRoundStatisticCollection',
        'services/characterWarehouse',
        'collections/character/characterCollection',],
    function ($, Logger, StatisticModel, StatisticCollection, CharacterWarehouse, CharacterCollection) {

        CombatRoundStatisticFactory = function() {
            // all variables are private
            var self = this;
            var allStatisticsCollection = null;
            var allCharactersCollection = null;

            // public functions

            // makes the next statistics for the round.  Requires a 'live' round and collection - 
            // meaning they have to be objects that have been retrived from Firebase
            this.createStatisticsForRound = function(round, collectionOfExistingStatisticsForRound) {
                var deferred = $.Deferred();
                if (collectionOfExistingStatisticsForRound.hasAnyStatistics()) {
                    $.when(createSubsequentRoundStatistics(round, collectionOfExistingStatisticsForRound)).then (
                        function() {
                            deferred.resolve(collectionOfExistingStatisticsForRound);
                        }
                    )
                } else {
                    $.when(createInitialRoundStatistics(round, collectionOfExistingStatisticsForRound)).then(
                        function() {
                            deferred.resolve(collectionOfExistingStatisticsForRound);
                        }
                    )
                }
                return deferred.promise();
            };

            // persists the statistic.  Adding to the 'all' collection - should also appear in any
            // encounter specific collections that the round belongs to.
            this.addStatistic = function(newStatistic) {
                var deferred = $.Deferred();
                $.when(getAllStatistics()).then (
                    function(myAllStatisticsCollection) {
                        myAllStatisticsCollection.add(newStatistic);
                        deferred.resolve();
                    }
                )
                return deferred.promise();
            }

            // private functions
            createInitialRoundStatistics = function(round, collectionOfExistingStatisticsForRound) {

                var deferred = $.Deferred();

                $.when(getAllCharacters()).then(
                    function(myCharactersCollection) {
                        // you'll loop through all the characters, but for now, just dummy one up.
                        var testStatistic = {};

                        testStatistic.encounterRoundID = collectionOfExistingStatisticsForRound.formatEncounterRoundID(round.get('encounterID'), round.get('id'));
                        testStatistic.characterID = '5';
                        testStatistic.initiative = 1;
                        testStatistic.alertness = 2;
                        testStatistic.observation = 3;
                        testStatistic.totalHits = 4;
                        testStatistic.bleeding = 5;
                        testStatistic.roundsStillStunned = 6;
                        testStatistic.negativeModifier = 7;
                        testStatistic.regeneration = 8;
                        testStatistic.hitsAtStartOfRound = 9;
                        testStatistic.hitsTakenDuringRound = 10;
                        testStatistic.characterTotalHitPointsAtStartOfRound = 0;

                        $.when(self.addStatistic(testStatistic)).then (
                            function(myStatistic) {
                                deferred.resolve(myStatistic);
                            }
                        )
                    }
                )

                return deferred.promise();
            };

            getAllStatistics = function() {
                var deferred = $.Deferred();
                $.when(getStatistics()).then(
                    function(myStatisticsCollection) {
                        deferred.resolve(myStatisticsCollection);
                    }
                )
                return deferred.promise();
            };

            getStatistics = function() {
                var deferred = $.Deferred();
                if (allStatisticsCollection) {
                    deferred.resolve(allStatisticsCollection);
                } else {
                    allStatisticsCollection = new StatisticCollection();
                    allStatisticsCollection.on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
            getAllCharacters = function() {
                var deferred = $.Deferred();
                $.when(getCharacters()).then(
                    function(myCharactersCollection) {
                        deferred.resolve(myCharactersCollection);
                    }
                )
                return deferred.promise();
            };

            getCharacters = function() {
                var deferred = $.Deferred();
                if (allCharactersCollection) {
                    deferred.resolve(allCharactersCollection);
                } else {
                    allCharactersCollection = new CharacterCollection();
                    allCharactersCollection.on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myCombatRoundStatisticFactory = new CombatRoundStatisticFactory();

        return myCombatRoundStatisticFactory;

    });