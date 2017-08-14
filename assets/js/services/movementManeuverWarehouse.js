define(['jquery',
        'logger',
        'collections/movementManeuver/movementManeuverCollection'],
    function ($, Logger, MovementManeuverCollection) {

        // I am the first stop for getting movement maneuvers.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        MovementManeuverWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var allManeuversCollectionKey = 'allManeuversCollectionKey';
            var allManeuverDifficultiesKey = 'allManeuverDifficultiesKey';

            // public functions

            this.getAllMovementManeuverDifficulties = function() {
                if (! cache[allManeuverDifficultiesKey]) {
                    populateManeuverDifficultiesCache();
                }
                return cache[allManeuverDifficultiesKey];;
            },

            this.getMovementManeuverResult = function(rollValue, difficulty) {
                var deferred = $.Deferred();

                $.when(getAllMovementManeuvers()).then (
                    function(allManeunversCollection) {
                        var selectedManeuver;
                        deferred.resolve();
                    }
                )

            },
            this.getAllMovementManeuvers = function() {
                var deferred = $.Deferred();
                if (cache[allManeuversCollectionKey]) {
                    deferred.resolve(cache[allManeuversCollectionKey]);
                } else {
                    cache[allManeuversCollectionKey] = new MovementManeuverCollection(null, {orderByMinimumRollValue : true});
                    cache[allManeuversCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.addMovementManeuver = function(maneuverAttributes) {
                var deferred = $.Deferred();

                $.when(getAllMovementManeuversUnordered()).then (
                    function(allManeunversCollection) {
                        allManeunversCollection.add(maneuverAttributes);
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            };

            this.removeMovementManeuver = function(aManeuver) {
                var deferred = $.Deferred();
                var myManeuver = aManeuver;
                $.when(getAllMovementManeuversUnordered()).then (
                    function(allManeuverssCollection) {
                        allManeuverssCollection.remove(myManeuver)
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            },

            // private functions

            populateManeuverDifficultiesCache = function() {

                var difficulties = [];
                
                difficulties.push(createDifficultyObject('trivial', 'Trivial'));
                difficulties.push(createDifficultyObject('routine', 'Routine'));
                difficulties.push(createDifficultyObject('easy', 'Easy'));
                difficulties.push(createDifficultyObject('light', 'Light'));
                difficulties.push(createDifficultyObject('medium', 'Medium'));
                difficulties.push(createDifficultyObject('hard', 'Hard'));
                difficulties.push(createDifficultyObject('veryHard', 'Very Hard'));
                difficulties.push(createDifficultyObject('extremelyHard', 'Extremely Hard'));
                difficulties.push(createDifficultyObject('sheerFolly', 'Sheer Folly'));
                difficulties.push(createDifficultyObject('absurd', 'Absurd'));
                difficulties.push(createDifficultyObject('insane', 'Insane'));
                difficulties.push(createDifficultyObject('phenomenal', 'Phenomenal'));
                difficulties.push(createDifficultyObject('virtuallyImpossible', 'Virtually Impossible'));

                cache[allManeuverDifficultiesKey] = difficulties;
            },
                
            createDifficultyObject = function(id, description) {
                return {'id' : id, 'description': description};
            },

            getAllMovementManeuversUnordered = function() {
                var deferred = $.Deferred();
                var cacheKey = allManeuversCollectionKey + ':unordered';
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    cache[cacheKey] = new MovementManeuverCollection(null, {orderByMinimumRollValue : false});
                    cache[cacheKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };


        var myMovementManeuverWarehouse = new MovementManeuverWarehouse();

        return myMovementManeuverWarehouse;

    });