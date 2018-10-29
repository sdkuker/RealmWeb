define(['jquery',
        'logger',
        'models/willContest/willContestModel',
        'collections/willContest/willContestCollection',
        'collections/willContest/willContestRoundsCollection',
        'services/itemWarehouse',
        'services/characterWarehouse',
        'services/willContestConsequenceWarehouse',
        'domain/die/die'],
    function ($, Logger, WillContestModel, WillContestCollection, WillContestRoundsCollection, ItemWarehouse,
              CharacterWarehouse, WillContestConsequenceWarehouse, Die) {

        // I am the first stop for getting will contests.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        WillContestWarehouse = function () {
            // all variables are private
            var self = this;
            var cache = {};
            var allContestsCollectionKey = 'allContestsCollectionKey';
            var allContestRoundsCollectionKey = 'allContestRoundsCollectionKey';
            var roundsForWillContestKey = 'roundsForWillContestKey';

            // public functions

            // will contestants

            this.getAllWillContestants = function () {
                var deferred = $.Deferred();
                $.when(ItemWarehouse.getAllItems(), CharacterWarehouse.getAllCharacters()).then(
                    function (allItemsCollection, allCharactersCollection) {
                        var allContestants = [];
                        allItemsCollection.each(function (model, index, list) {
                            allContestants.push({
                                name: model.get('name'),
                                will: parseInt(model.get('will')),
                                willModifier: parseInt(model.get('willModifier')),
                                id: model.get('id')
                            });
                        });
                        allCharactersCollection.each(function (model, index, list) {
                            allContestants.push({
                                name: decodeURI(model.get('name')),
                                will: parseInt(model.get('will')),
                                willModifier: parseInt(model.get('willModifier')),
                                id: model.get('id')
                            });
                        });

                        deferred.resolve(allContestants);
                    }
                )

                return deferred.promise();
            };

            this.getWillContestant = function (aContestantId) {
                var deferred = $.Deferred();
                $.when(this.getAllWillContestants()).then(
                    function (allWillContestantsArray) {
                        var desiredContestant = null;
                        for (index = 0; index < allWillContestantsArray.length && desiredContestant === null; index++) {
                            if (allWillContestantsArray[index].id === aContestantId) {
                                desiredContestant = allWillContestantsArray[index];
                            }
                        }

                        deferred.resolve(desiredContestant);
                    }
                )

                return deferred.promise();
            };

            // will contests

            this.createDefaultWillContest = function () {
                var deferred = $.Deferred();
                $.when(this.getAllWillContestants()).then (
                    function(willContestantArray) {
                        if (willContestantArray.length > 1) {
                            var newModel = new WillContestModel();
                            newModel.set('contestantOneID', willContestantArray[0].id);
                            newModel.set('contestantOneName', willContestantArray[0].name);
                            newModel.set('contestantTwoID', willContestantArray[1].id);
                            newModel.set('contestantTwoName', willContestantArray[1].name);
                            newModel.set('currentRoundNumber', 0);
                            deferred.resolve(newModel);
                        } else {
                            deferred.reject('need at least 2 contestants for a contest');
                        }
                    },
                    function(error) {
                        deferred.reject('unable to get contestants for a new will contest');
                    }
                )
                return deferred.promise();
            };
            this.getAllWillContests = function () {
                var deferred = $.Deferred();
                if (cache[allContestsCollectionKey]) {
                    deferred.resolve(cache[allContestsCollectionKey]);
                } else {
                    cache[allContestsCollectionKey] = new WillContestCollection();
                    cache[allContestsCollectionKey].on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.addWillContest = function (contestAttributes) {
                var deferred = $.Deferred();

                $.when(this.getAllWillContests()).then(
                    function (allContestsCollection) {
                        // note - you have to define this callback before you do the add - else the event doesn't generate
                        allContestsCollection.on('add', function (aWillContestModel) {
                            deferred.resolve(aWillContestModel);
                        });
                        allContestsCollection.add(contestAttributes);
                    }
                )

                return deferred.promise();
            };

            this.removeWillContest = function (aContest) {
                var deferred = $.Deferred();
                var myContest = aContest;
                $.when(this.getAllWillContests(), this.getAllWillContestRounds()).then(
                    function (allContestsCollection, allRoundsCollection) {
                        var arrayOfRoundsToDelete = allRoundsCollection.where({willContestID : aContest.id});
                        for (index = 0; index < arrayOfRoundsToDelete.length; index++) {
                            allRoundsCollection.remove(arrayOfRoundsToDelete[index]);
                        }
                        allContestsCollection.remove(aContest);
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            };

            // will contest rounds

            this.getRoundsForWillContest = function (aWillContestId) {
                var deferred = $.Deferred();

                var collection = new WillContestRoundsCollection(null, {willContestID: aWillContestId});
                collection.on('sync', function (collection) {
                    deferred.resolve(collection);
                })
                return deferred.promise();
            };

            this.getAllWillContestRounds = function () {
                var deferred = $.Deferred();
                var cacheKey = allContestRoundsCollectionKey;
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    cache[cacheKey] = new WillContestRoundsCollection();
                    cache[cacheKey].on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.generateNextWillContestRound = function (aWillContestModel) {
                var deferred = $.Deferred();
                if (! aWillContestModel.id) {
                    var willContestAttributes = {
                        contestantOneID: aWillContestModel.get('contestantOneID'),
                        contestantTwoID: aWillContestModel.get('contestantTwoID'),
                        contestantOneName: aWillContestModel.get('contestantOneName'),
                        contestantTwoName: aWillContestModel.get('contestantTwoName'),
                        currentRoundNumber: 0
                    };
                    $.when(this.addWillContest(willContestAttributes)).then(
                        function (aNewWillContestModel) {
                            $.when(createNextWillContestRound(aNewWillContestModel)).then(
                                function (aNewWillContestRound) {
                                    aNewWillContestModel.set('currentRoundNumber', aNewWillContestRound.get('roundNumber'));
                                    deferred.resolve({newRound: aNewWillContestRound, newContestModel: aNewWillContestModel});
                                },
                                function(aRejectReason) {
                                    deferred.reject(aRejectReason);
                                }
                            )
                        }
                    )
                } else {
                    $.when(createNextWillContestRound(aWillContestModel)).then(
                        function (aNewWillContestRound) {
                            aWillContestModel.set('currentRoundNumber', aNewWillContestRound.get('roundNumber'));
                            deferred.resolve({newRound: aNewWillContestRound});
                        },
                        function(aRejectReason) {
                            deferred.reject(aRejectReason);
                        }
                    )
                };

                return deferred.promise();
            };

            // private functions

            createNextWillContestRound = function (aWillContestModel) {
                var deferred = $.Deferred();

                $.when(self.getRoundsForWillContest(aWillContestModel.id),
                        self.getWillContestant(aWillContestModel.get('contestantOneID')),
                        self.getWillContestant(aWillContestModel.get('contestantTwoID'))).then(
                    function (willContestRoundsCollection, contestantOne, contestantTwo) {
                        var currentRound = null;
                        willContestRoundsCollection.forEach(function (myRound, key, list) {
                            if (currentRound == null || myRound.get('roundNumber') > currentRound.get('roundNumber')) {
                                currentRound = myRound;
                            }
                        });

                        var newRoundAttributes = {willContestID: aWillContestModel.id};
                        if (currentRound) {
                            newRoundAttributes.roundNumber = currentRound.get('roundNumber') + 1;
                        } else {
                            newRoundAttributes.roundNumber = 1;
                        }
                        var contestantOneTotalWillDescription = '';
                        var contestantTwoTotalWillDescription = '';

                        var contestantOneTemporaryModifier = 0;
                        var contestantOnePermanentModifier = 0;
                        willContestRoundsCollection.forEach(function (myRound, key, list) {
                            if (myRound.get('consequencePermanentModifier') && myRound.get('consequencePermanentModifier') > 0) {
                                contestantOnePermanentModifier += myRound.get('consequencePermanentModifier');
                                contestantOneTotalWillDescription +=
                                    ' + round ' + myRound.get('roundNumber') + ' permanent modifier of: ' + myRound.get('consequencePermanentModifier');

                            }

                            // a consequence begins it's effect the round after it's been determined
                            if (myRound.get('roundNumber') + myRound.get('consequenceTemporaryModifierExpirationRound') >= newRoundAttributes.roundNumber) {
                                contestantOneTemporaryModifier += myRound.get('consequenceTemporaryModifier');
                                contestantOneTotalWillDescription +=
                                    ' + round ' + myRound.get('roundNumber') + ' temporary modifier of: ' + myRound.get('consequenceTemporaryModifier');

                            }
                        })


                        var contestantOneOpenEndedRoll = Die.rollOpenEnded();

                        newRoundAttributes.contestantOneTotalWill = contestantOne.will + contestantOneOpenEndedRoll +
                            contestantOnePermanentModifier + contestantOneTemporaryModifier;

                        contestantOneTotalWillDescription += ' + die roll of: ' + contestantOneOpenEndedRoll;
                        contestantOneTotalWillDescription += ' + contestant will of: ' + contestantOne.will;
                        contestantOneTotalWillDescription += ' = total will of: ' + newRoundAttributes.contestantOneTotalWill;
                        newRoundAttributes.contestantOneTotalWillDescription = contestantOneTotalWillDescription;

                        var contestantTwoOpenEndedRoll = Die.rollOpenEnded();
                        newRoundAttributes.contestantTwoTotalWill = contestantTwo.will + contestantTwoOpenEndedRoll;

                        contestantTwoTotalWillDescription += ' + die roll of: ' + contestantTwoOpenEndedRoll;
                        contestantTwoTotalWillDescription += ' + contestant will of: ' + contestantTwo.will;
                        contestantTwoTotalWillDescription += ' = total will of: ' + newRoundAttributes.contestantTwoTotalWill;
                        newRoundAttributes.contestantTwoTotalWillDescription = contestantTwoTotalWillDescription;

                        newRoundAttributes.consequenceValue = newRoundAttributes.contestantOneTotalWill -
                                                                newRoundAttributes.contestantTwoTotalWill;

                        $.when(WillContestConsequenceWarehouse.getConsequence(newRoundAttributes.consequenceValue)).then(
                            function(aConsequence) {
                                if (aConsequence) {
                                    newRoundAttributes.consequencePermanentModifier = parseInt(aConsequence.get('permanentBonus'));
                                    newRoundAttributes.consequenceTemporaryModifier = parseInt(aConsequence.get('temporaryBonus'));
                                    newRoundAttributes.consequenceTemporaryModifierExpirationRound = parseInt(aConsequence.get('durationInRoundsOfTemporaryBonus'));
                                    newRoundAttributes.consequenceId = aConsequence.id;
                                    newRoundAttributes.consequenceDescription = decodeURI(aConsequence.get('description'));

                                    $.when(addWillContestRound(newRoundAttributes)).then(
                                        function(newRoundModel) {
                                            deferred.resolve(newRoundModel);
                                        }
                                    )
                                } else {
                                    console.log('could not find a consequence for value: ' + newRoundAttributes.consequenceValue);
                                }
                            },
                            function(aRejectString) {
                                deferred.reject(aRejectString);
                            }
                        )
                    }
                )

                return deferred.promise();
            };

            addWillContestRound = function (contestRoundAttributes) {
                var deferred = $.Deferred();

                $.when(self.getAllWillContestRounds()).then(
                    function (allWillContestRoundsCollection) {
                        allWillContestRoundsCollection.on('add', function (aWillContestRoundModel) {
                            deferred.resolve(aWillContestRoundModel);
                        })
                        allWillContestRoundsCollection.add(contestRoundAttributes);
                    }
                )

                return deferred.promise();
            };

        };


        var myWillContestWarehouse = new WillContestWarehouse();

        return myWillContestWarehouse;

    });