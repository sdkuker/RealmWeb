define(['jquery',
        'logger',
        'models/combat/combatRoundModel',
        'collections/combat/combatRoundCollection'],
    function ($, Logger, CombatEncounterModel, CombatRoundCollection) {

        CombatRoundFactory = function() {
            // all variables are private
            var self = this;
            var allRoundsCollection = null;

            // public functions
            
            // makes the next round for the encounter.  Requires a 'live' encounter and collection - 
            // meaning they have to be objects that have been retrived from Firebase
            this.createNextCombatRound = function(combatEncounter, collectionOfExistingCombatRounds) {
                var deferred = $.Deferred();
                if (combatEncounter.hasAnyRounds()) {
                    $.when(createSubsequentRound(combatEncounter, collectionOfExistingCombatRounds)).then (
                        function(newRound) {
                            deferred.resolve(newRound);
                        }
                    )
                } else {
                    $.when(createFirstRound(combatEncounter, collectionOfExistingCombatRounds)).then(
                        function(newRound) {
                            deferred.resolve(newRound);
                        }
                    )
                }
                return deferred.promise();
            };

            // persists the round.  Adding to the 'all' collection - should also appear in any
            // encounter specific collections that the round belongs to.
            this.addCombatRound = function(newCombatRound) {
                var deferred = $.Deferred();
                $.when(getAllCombatRounds()).then (
                    function(myAllRoundsCollection) {
                        myAllRoundsCollection.on('add', function(addedCombatRound) {
                            deferred.resolve(addedCombatRound);
                        })
                        myAllRoundsCollection.add(newCombatRound);
                    }
                )
                return deferred.promise();
            };

            // deletes the round.  Removing from the 'all' collection - should also appear in any
            // encounter specific collections that the round belongs to.
            this.removeCombatRound = function(combatRoundToBeRemoved) {
                var deferred = $.Deferred();
                if (combatRoundToBeRemoved.get('id')) {
                    $.when(getAllCombatRounds()).then (
                        function(myAllRoundsCollection) {
                            myAllRoundsCollection.remove(combatRoundToBeRemoved);
                            deferred.resolve();
                        }
                    )
                } else {
                    deferred.resolve();
                }

                return deferred.promise();
            };

            // private functions
            createFirstRound = function(combatEncounter, collectionOfExistingCombatRounds) {
                
                var deferred = $.Deferred();
                
                // create the round
                $.when(self.addCombatRound({encounterID : combatEncounter.get('id'), roundNumber : 1})).then (
                    function(newCombatRound) {
                        combatEncounter.set('openRound', 1);
                        deferred.resolve(newCombatRound);
                    }
                )
                return deferred.promise();
            };

            getAllCombatRounds = function() {
                var deferred = $.Deferred();
                $.when(getCombatRoundCollection()).then(
                    function(myCombatRoundCollection) {
                        deferred.resolve(myCombatRoundCollection);
                    }
                )
                return deferred.promise();
            };

            getCombatRoundCollection = function() {
                var deferred = $.Deferred();
                if (allRoundsCollection) {
                    deferred.resolve(allRoundsCollection);
                } else {
                    allRoundsCollection = new CombatRoundCollection();
                    allRoundsCollection.on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };

        var myCombatRoundFactory = new CombatRoundFactory();

        return myCombatRoundFactory;

    });