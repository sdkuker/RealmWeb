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
            var movementManeuversForDifficultyBaseKey = 'movementManeuversForDifficultyBaseKey';
            var allManeuverDifficultiesKey = 'allManeuverDifficultiesKey';

            // public functions

            this.getAllMovementManeuverDifficulties = function() {
                if (! cache[allManeuverDifficultiesKey]) {
                    populateManeuverDifficultiesCache();
                }
                return cache[allManeuverDifficultiesKey];;
            },

            this.getMovementManeuversForDifficulty = function(aMovementManeuverDifficultyModelObject) {
                var deferred = $.Deferred();
                var cacheKey = movementManeuversForDifficultyBaseKey + '-' + aMovementManeuverDifficultyModelObject.get('id');
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    cache[cacheKey] = new MovementManeuverCollection(null, {difficultyId : aMovementManeuverDifficultyModelObject.get('id')});
                    cache[cacheKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.getMovementManeuversForDifficultyWithDefaultForAdd = function(aMovementManeuverDifficultyModelObject) {
                var deferred = $.Deferred();
                var cacheKey = movementManeuversForDifficultyBaseKey + '-' + aMovementManeuverDifficultyModelObject.get('id') + ':withDefault';
                if (cache[cacheKey]) {
                    deferred.resolve(cache[cacheKey]);
                } else {
                    var defaultManeuver = {};
                    defaultManeuver['result'] = 'Add New Maneuver On This Row';
                    defaultManeuver['minimumRollValue'] = 0;
                    defaultManeuver['maximumRollValue'] = 0;
                    cache[cacheKey] = new MovementManeuverCollection(defaultManeuver, {difficultyId : aMovementManeuverDifficultyModelObject.get('id')});
                    cache[cacheKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.getMovementManeuverResult = function(rollValue, aMovementManeuverDifficultyModelObject) {
                var deferred = $.Deferred();

                $.when(getMovementManeuversForDifficulty(aMovementManeuverDifficultyModelObject)).then (
                    function(allManeunversCollection) {
                        deferred.resolve(allManeunversCollection.getManeuverForRoll(rollValue));
                    }
                )
            },

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