define(['jquery',
        'logger',
        'collections/willContest/willContestCollection',
        'collections/willContest/willContestRoundsCollection',
        'services/itemWarehouse',
        'services/characterWarehouse'],
    function ($, Logger, WillContestCollection, WillContestRoundsCollection, ItemWarehouse, CharacterWarehouse) {

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

                $.when(getAllWillContests()).then(
                    function (allContestsCollection) {
                        allContestsCollection.add(contestAttributes);
                        allContestsCollection.on('add', function (aWillContestModel) {
                            deferred.resolve(aWillContestModel);
                        })
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
                var cacheKey = roundsForWillContestKey + '-' + aWillContestId;
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    cache[cacheKey] = new WillContestRoundsCollection(null, {willContestID: aWillContestId});
                    cache[cacheKey].on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
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
                var self = this;
                if (aWillContestModel.id === null) {
                    var willContestAttributes = {
                        contestantOneID: aWillContestModel.contestantOneID,
                        contestantTwoID: aWillContestModel.contestantTwoID,
                        contestantOneName: aWillContestModel.contestantOneName,
                        contestantTwoName: aWillContestModel.contestantTwoName,
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
                }

                return deferred.promise();
            };

            // private functions

            createNextWillContestRound = function (aWillContestModel) {
                var deferred = $.Deferred();
                var self = this;

                $.when(this.getRoundsForWillContest(aWillContestModel)).then(
                    function (willContestRoundsCollection) {
                        var currentRound = null;
                        willContestRoundsCollection.forEach(function (myRound, key, list) {
                            if (curentRound == null || myRound.get('roundNumber') > currentRound.get('roundNumber')) {
                                currentRound = myRound;
                            }
                        });
                        if (currentRound) {
                            var newRoundAttributes = {
                                willContestID: aWillContestModel.id,
                                roundNumber: currentRound.get('roundNumber') + 1,
                                contestantOneTotalWill: 1,
                                contestantTwoTotalWill: 2,
                                contestantOnePermanentModifier: 3,
                                contestantOneTemporaryModifier: 4,
                                contestantOneTemporaryModifierExpirationRound: 5,
                                consequenceId: 16,
                                consequenceDescription: 'something bad happened to Danny'
                            };
                        };
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

                $.when(getAllWillContestRounds()).then(
                    function (allWillContestRoundsCollection) {
                        allWillContestRoundsCollection.add(contestRoundAttributes);
                        allWillContestRoundsCollection.on('add', function (aWillContestRoundModel) {
                            deferred.resolve(aWillContestRoundModel);
                        })
                    }
                )

                return deferred.promise();
            };

        };


        var myWillContestWarehouse = new WillContestWarehouse();

        return myWillContestWarehouse;

    });