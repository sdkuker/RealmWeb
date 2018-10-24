define(['jquery',
        'logger',
        'models/willContest/willContestModel',
        'collections/willContest/willContestCollection',
        'collections/willContest/willContestRoundsCollection',
        'services/itemWarehouse',
        'services/characterWarehouse'],
    function ($, Logger, WillContestModel, WillContestCollection, WillContestRoundsCollection, ItemWarehouse, CharacterWarehouse) {

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
                                will: model.get('will'),
                                willModifier: model.get('willModifier'),
                                id: model.get('id')
                            });
                        });
                        allCharactersCollection.each(function (model, index, list) {
                            allContestants.push({
                                name: decodeURI(model.get('name')),
                                will: model.get('will'),
                                willModifier: model.get('willModifier'),
                                id: model.get('id')
                            });
                        });

                        deferred.resolve(allContestants);
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
                $.when(getAllWillContests()).then(
                    function (allContestsCollection) {
                        allContestsCollection.remove(myConsequence)
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
                                }
                            )
                        }
                    )
                } else {
                    $.when(createNextWillContestRound(aWillContestModel)).then(
                        function (aNewWillContestRound) {
                            aWillContestModel.set('currentRoundNumber', aNewWillContestRound.get('roundNumber'));
                            deferred.resolve({newRound: aNewWillContestRound});
                        }
                    )
                };

                return deferred.promise();
            };

            // private functions

            createNextWillContestRound = function (aWillContestModel) {
                var deferred = $.Deferred();

                $.when(self.getRoundsForWillContest(aWillContestModel.id)).then(
                    function (willContestRoundsCollection) {
                        var currentRound = null;
                        willContestRoundsCollection.forEach(function (myRound, key, list) {
                            if (curentRound == null || myRound.get('roundNumber') > currentRound.get('roundNumber')) {
                                currentRound = myRound;
                            }
                        });
                        var newRoundAttributes = {
                            willContestID: aWillContestModel.id,
                            contestantOneTotalWill: 1,
                            contestantTwoTotalWill: 2,
                            contestantOnePermanentModifier: 3,
                            contestantOneTemporaryModifier: 4,
                            contestantOneTemporaryModifierExpirationRound: 5,
                            consequenceId: 16,
                            consequenceDescription: 'something bad happened to Danny'
                        };
                        if (currentRound) {
                            newRoundAttributes.roundNumber = currentRound.get('roundNumber') + 1;
                        } else {
                            newRoundAttributes.roundNumber = 1;
                        }
                        $.when(addWillContestRound(newRoundAttributes)).then(
                            function(newRoundModel) {
                                deferred.resolve(newRoundModel);
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