define(['jquery',
        'logger',
        'collections/combat/characterCombatRoundStatisticCollection',
        'collections/character/characterCollection',
        'collections/character/characterDisplayCollection',
        'collections/combat/combatEncounterCharacterCollection',
        'domain/combat/combatRoundAttributeDeterminer',
        'services/characterWarehouse'],
    function ($, Logger, StatisticCollection, CharacterCollection, CharacterDisplayCollection, 
        CombatEncounterCharacterCollection, CombatRoundAttributeDeterminer, CharacterWarehouse) {

        CombatRoundStatisticFactory = function() {
            // all variables are private
            var self = this;
            var allStatisticsCollection = null;
            var allCharactersCollection = null;
            var allCombatEncounterCharactersCollection = null;
            // key is the character number, value is the number of clones in combat
            var numberOfCharacterClonesInCombat = new Map();

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
                );
                return deferred.promise();
            };

            // deletes the stastistic.  Removing from the 'all' collection - should also appear in any
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
            };

            // private functions
            createInitialRoundStatistics = function(round, collectionOfExistingStatisticsForRound) {

                var deferred = $.Deferred();
                var encounterRoundID = collectionOfExistingStatisticsForRound.formatEncounterRoundID(round.get('encounterID'), round.get('id'));

                $.when(getCharactersForEncounter(round.get('encounterID'))).then(
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
                );

                return deferred.promise();
            };

            createInitialRoundStatisticsObjectForCharacter = function(aCharacter, encounterRoundID) {

                var characterStatisticsObject = {};
                var numberOfClonesInCombat = numberOfCharacterClonesInCombat.get(aCharacter.get('id'));

                characterStatisticsObject.encounterRoundID = encounterRoundID;
                characterStatisticsObject.playerID = aCharacter.get('playerID');
                characterStatisticsObject.characterID = aCharacter.get('id');
                characterStatisticsObject.characterName = aCharacter.get('name');
                characterStatisticsObject.initiative = CombatRoundAttributeDeterminer.determineRoundInitiative(aCharacter);
                characterStatisticsObject.alertness = CombatRoundAttributeDeterminer.determineRoundAlertness(aCharacter);
                characterStatisticsObject.observation = CombatRoundAttributeDeterminer.determineRoundObservation(aCharacter);
                characterStatisticsObject.totalHits = aCharacter.totalHitPoints() * numberOfClonesInCombat;
                characterStatisticsObject.bleeding = 0;
                characterStatisticsObject.roundsStillStunned = 0;
                characterStatisticsObject.negativeModifier = 0;
                characterStatisticsObject.regeneration = 0;
                characterStatisticsObject.hitsAtStartOfRound = aCharacter.totalHitPoints() * numberOfClonesInCombat;
                characterStatisticsObject.hitsTakenDuringRound = 0;
                characterStatisticsObject.characterTotalHitPointsAtStartOfRound = aCharacter.totalHitPoints() * numberOfClonesInCombat;
                characterStatisticsObject.initialNumberOfCharacterClones = numberOfClonesInCombat;
                characterStatisticsObject.totalHitsPerClone = aCharacter.totalHitPoints();

                characterStatisticsObject.totalDefensiveBonus = aCharacter.totalDefensiveBonus();
                characterStatisticsObject.totalDefensiveBonusDescription = aCharacter.totalDefensiveBonusDescription();
                characterStatisticsObject.totalDefensiveBonusMinusAdrenalDefense = aCharacter.totalDefensiveBonusMinusAdrenalDefense();
                characterStatisticsObject.totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry = aCharacter.totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry();

                return characterStatisticsObject;
            };

            createSubsequentRoundStatistics = function(round, collectionOfExistingStatisticsForRound) {

                require(['services/combatRoundWarehouse',
                        'services/characterCombatRoundStatisticWarehouse'],
                    function(CombatRoundWarehouse, CombatRoundStatisticWarehouse) {

                            var deferred = $.Deferred();
                            var addStatisticDeferreds = [];

                            $.when(CombatRoundWarehouse.getPreviousCombatRound(round)).then(
                                function(previousCombatRound) {
                                    $.when(CombatRoundStatisticWarehouse.getCombatRoundStatisticsForRound(previousCombatRound)).then (
                                        function(previousRoundCombatStatisticsCollection) {
                                            // getting all characters to populate the warehouse so the 'getCharacterWithoutWaiting' will work
                                            // not actully using allCharactersCollection for anything
                                            $.when(CharacterWarehouse.getAllCharacters()).then (
                                                function(allCharactersCollection) {
                                                    previousRoundCombatStatisticsCollection.each(function(statistic, index, list) {
                                                        var myCharacter = CharacterWarehouse.getCharacterWithoutWaiting(statistic.get('characterID'))
                                                        var newStatisticObject = statistic.cloneForCombat(myCharacter);
                                                        newStatisticObject.encounterRoundID = collectionOfExistingStatisticsForRound.
                                                        formatEncounterRoundID(round.get('encounterID'), round.get('id'));
                                                        addStatisticDeferreds.push(self.addStatistic(newStatisticObject));
                                                    });
                                                    $.when.apply($, addStatisticDeferreds).then(function() {
                                                        deferred.resolve();
                                                    });
                                                }
                                            )
                                        }
                                    );
                                }
                            );
                            return deferred.promise();
                    });
            };

            getHitsforCharacterAtEndOfRound = function(aCombatRoundStatistic, aCharacter) {
                var calculatedHitsAtEndOfRound = aCombatRoundStatistic.get('hitsAtStartOfRound') - aCombatRoundStatistic.get('hitsTakenDuringRound') -
                    aCombatRoundStatistic.get('bleeding') + aCombatRoundStatistic.get('regeneration');
                if (aCharacter) {
                    return Math.min(calculatedHitsAtEndOfRound, aCharacter.totalHitPoints());
                } else {
                    return calculatedHitsAtEndOfRound;
                }
            };

            getAllStatistics = function() {
                var deferred = $.Deferred();
                $.when(getStatistics()).then(
                    function(myStatisticsCollection) {
                        deferred.resolve(myStatisticsCollection);
                    }
                );
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
            getCharactersForEncounter = function(encounterID) {
                var deferred = $.Deferred();
                if (allCharactersCollection) {
                    deferred.resolve(allCharactersCollection);
                } else {
                    $.when(getAllCombatEncounterCharacters(encounterID)).then(
                        function(myCombatEncounterCharactersCollection) {
                            // need to get all the characters so when you 
                            // getCharacterWithoutWaiting, they're there in the warehouse
                            // you don't actually use allCharactersCollection here
                            $.when(CharacterWarehouse.getAllCharacters()).then(
                                function(allCharactersCollection) {
                                    allCharactersDisplayCollection = new CharacterDisplayCollection();
                                    myCombatEncounterCharactersCollection.each(function(combatEncounterCharacter, index) {
                                        if (combatEncounterCharacter.get('activeInEncounter')) {
                                            allCharactersDisplayCollection.push(CharacterWarehouse.getCharacterWithoutWaiting(combatEncounterCharacter.get('characterID')));
                                            numberOfCharacterClonesInCombat.set(combatEncounterCharacter.get('characterID'), combatEncounterCharacter.get('numberInCombat'))
                                        }
                                    });
                                    deferred.resolve(allCharactersDisplayCollection);
                                }
                            )
                        }
                    );
                }
                return deferred.promise();
            };

            getAllCombatEncounterCharacters = function(encounterID) {
                var deferred = $.Deferred();
                if (allCombatEncounterCharactersCollection) {
                    deferred.resolve(allCombatEncounterCharactersCollection);
                } else {
                    allCombatEncounterCharactersCollection = new CombatEncounterCharacterCollection(null, {'encounterID': encounterID});
                    allCombatEncounterCharactersCollection.on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myCombatRoundStatisticFactory = new CombatRoundStatisticFactory();

        return myCombatRoundStatisticFactory;

    });