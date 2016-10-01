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
                if (round.get('roundNumber') > 1) {
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
            };

            // deletes the stastic.  Removing from the 'all' collection - should also appear in any
            // specific collections that the statistic belongs to.
            this.removeStatistic = function(aStatisticToBeRemoved) {
                var deferred = $.Deferred();
                if (aStatisticToBeRemoved.get('id')) {
                    $.when(getAllStatistics()).then (
                        function(myAllStatisticsCollection) {
                            myAllStatisticsCollection.remove(aStatisticToBeRemoved);
                            deferred.resolve();
                        }
                    )
                } else {
                    deferred.resolve();
                }
                return deferred.promise();
            }

            // private functions
            createInitialRoundStatistics = function(round, collectionOfExistingStatisticsForRound) {

                var deferred = $.Deferred();
                var encounterRoundID = collectionOfExistingStatisticsForRound.formatEncounterRoundID(round.get('encounterID'), round.get('id'));

                $.when(getAllCharacters()).then(
                    function(myCharactersCollection) {
                        var arrayOfAddStatisticsDeferred = [];
                        myCharactersCollection.each(function(character, index) {
                            var myCharacterStatisticObject = createInitialRoundStatisticsObjectForCharacter(character, encounterRoundID);
                            arrayOfAddStatisticsDeferred.push(self.addStatistic(myCharacterStatisticObject));
                        });
                        $.when.apply($, arrayOfAddStatisticsDeferred).then(function() {
                            deferred.resolve();
                        });
                    }
                )

                return deferred.promise();
            };

            createInitialRoundStatisticsObjectForCharacter = function(aCharacter, encounterRoundID) {

                var characterStatisticsObject = {};

                characterStatisticsObject.encounterRoundID = encounterRoundID;
                characterStatisticsObject.characterID = aCharacter.get('id');
                characterStatisticsObject.characterName = aCharacter.get('name');
                characterStatisticsObject.initiative = aCharacter.get('initiative');
                characterStatisticsObject.alertness = aCharacter.get('alertnessSkill');
                characterStatisticsObject.observation = aCharacter.get('observationSkill');
                characterStatisticsObject.totalHits = aCharacter.totalHitPoints();
                characterStatisticsObject.bleeding = 0;
                characterStatisticsObject.roundsStillStunned = 0;
                characterStatisticsObject.negativeModifier = 0;
                characterStatisticsObject.regeneration = 0;
                characterStatisticsObject.hitsAtStartOfRound = aCharacter.totalHitPoints();
                characterStatisticsObject.hitsTakenDuringRound = 0;
                characterStatisticsObject.characterTotalHitPointsAtStartOfRound = aCharacter.totalHitPoints();

                return characterStatisticsObject;
            };

            createSubsequentRoundStatistics = function(round, collectionOfExistingStatisticsForRound) {

                var deferred = $.Deferred();

                $.when(getAllCharacters()).then(
                    function(myCharactersCollection) {
                        // you'll loop through all the characters, but for now, just dummy one up.
                        var testStatistic = {};

                        //this is just a test thang
   //                     var aRound = collectionOfExistingStatisticsForRound[0].cloneForCombat(myCharactersCollection[0]);

                        testStatistic.encounterRoundID = collectionOfExistingStatisticsForRound.formatEncounterRoundID(round.get('encounterID'), round.get('id'));
                        testStatistic.characterID = round.get('roundNumber') * 10  + 5;
                        testStatistic.initiative = round.get('roundNumber') * 10  + 1;
                        testStatistic.alertness = round.get('roundNumber') * 10  + 2;
                        testStatistic.observation = round.get('roundNumber') * 10  + 3;
                        testStatistic.totalHits = round.get('roundNumber') * 10  + 4;
                        testStatistic.bleeding = round.get('roundNumber') * 10  + 5;
                        testStatistic.roundsStillStunned = round.get('roundNumber') * 10  + 6;
                        testStatistic.negativeModifier = round.get('roundNumber') * 10  + 7;
                        testStatistic.regeneration = round.get('roundNumber') * 10  + 8;
                        testStatistic.hitsAtStartOfRound = round.get('roundNumber') * 10  + 9;
                        testStatistic.hitsTakenDuringRound = round.get('roundNumber') * 10  + 10;
                        testStatistic.characterTotalHitPointsAtStartOfRound = round.get('roundNumber');

                        $.when(self.addStatistic(testStatistic)).then (
                            function(myStatistic) {
                                deferred.resolve(myStatistic);
                            }
                        )
                    }
                )

                return deferred.promise();
            };

            getHitsforCharacterAtEndOfRound = function(aCombatRoundStatistic, aCharacter) {
                var calculatedHitsAtEndOfRound = aCombatRoundStatistic.get('hitsAtStartOfRound') - aCombatRoundStatistic.get('hitsTakenDuringRound') -
                    aCombatRoundStatistic.get('bleeding') + aCombatRoundStatistic.get('regeneration');
                if (aCharacter) {
                    return Math.min(calculatedHitsAtEndOfRound, aCharacter.totalHitPoints());
                } else {
                    return calculatedHitsAtEndOfRound;
                }
            }

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