define(['jquery',
        'logger',
        'collections/movementManeuverMaintenance/movementManeuverCollection'],
    function ($, Logger, MovementManeuverCollection) {

        // I am the first stop for getting movement maneuvers.  If I don't have them,
        // I'll get them from Firebase and put them in my cache.  If I have them in my cache,
        // I'll return them.

        MovementManeuverWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var allManeuversCollectionKey = 'allManeuversCollectionKey';

            // public functions

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

            getAllMovementManeuversUnordered = function() {
                var deferred = $.Deferred();
                var cacheKey = allManeuversCollectionKey + ':unordered';
                if (cache[allManeuversCollectionKey]) {
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