define(['jquery',
    'logger',
    'collections/movementManeuver/movementManeuverDifficultyCollection'],
    function ($, Logger, MovementManeuverDifficultyCollection) {

        // I am the first stop for getting movement maneuvers difficulties.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        MovementManeuverDifficultyWarehouse = function () {
            // all variables are private
            var self = this;
            var cache = {};
            var unorderedDifficultiesKey = 'unorderedDifficultiesKey';
            var orderedDifficultiesKey = 'orderedDifficultiesKey';

            // public functions

            this.getOrderedMovementManeuverDifficulties = function () {
                var deferred = $.Deferred();
                if (cache[orderedDifficultiesKey]) {
                    deferred.resolve(cache[orderedDifficultiesKey]);
                } else {
                    $.when(getMovementManeuverDifficultiesOrdered()).then(
                        function(difficultiesCollection) {
                            deferred.resolve(difficultiesCollection);
                        }
                    )
                }
                return deferred.promise();
            };

            this.addMovementManeuverDifficulty = function (maneuverDifficultyAttributes) {
                var deferred = $.Deferred();

                $.when(getMovementManeuverDifficultiesUnordered()).then(
                    function (allManeunverDifficultiesCollection) {
                        allManeunverDifficultiesCollection.on('add', function (addedModel) {
                            deferred.resolve(addedModel);
                        });
                        allManeunverDifficultiesCollection.add(maneuverDifficultyAttributes);
                    }
                )

                return deferred.promise();
            };

            this.removeMovementManeuverDifficulty = function (aManeuverDifficultyModel) {
                var deferred = $.Deferred();
                $.when(getMovementManeuverDifficultiesUnordered()).then(
                    function (allManeuversDifficultyCollection) {
                        allManeuversDifficultyCollection.remove(aManeuverDifficultyModel)
                        deferred.resolve();
                    }
                )

                return deferred.promise();
            },

                // private functions

                getMovementManeuverDifficultiesUnordered = function () {
                    var deferred = $.Deferred();
                    if (cache[unorderedDifficultiesKey]) {
                        deferred.resolve(cache[unorderedDifficultiesKey]);
                    } else {
                        cache[unorderedDifficultiesKey] = new MovementManeuverDifficultyCollection(null, { orderByDifficulty: false });
                        cache[unorderedDifficultiesKey].on('sync', function (collection) {
                            deferred.resolve(collection);
                        })
                    }
                    return deferred.promise();
                };

            getMovementManeuverDifficultiesOrdered = function () {
                var deferred = $.Deferred();
                if (cache[orderedDifficultiesKey]) {
                    deferred.resolve(cache[orderedDifficultiesKey]);
                } else {
                    cache[orderedDifficultiesKey] = new MovementManeuverDifficultyCollection(null, { orderByDifficulty: true });
                    cache[orderedDifficultiesKey].on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };


        var myMovementManeuverDifficultyWarehouse = new MovementManeuverDifficultyWarehouse();

        return myMovementManeuverDifficultyWarehouse;

    });