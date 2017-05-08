define(['jquery',
        'logger',
        'collections/criticalHit/criticalHitCollection',
        'collections/criticalHit/criticalHitTypeCollection'],
    function ($, Logger, CriticalHitCollection, CriticalHitTypeCollection) {

        // I am the first stop for getting critical hits.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CriticalHitWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};

            // public functions
            this.getCriticalHitsForType = function(aCriticalHitTypeString) {
                var deferred = $.Deferred();
                if (cache[aCriticalHitTypeString]) {
                    deferred.resolve(cache[aCriticalHitTypeString]);
                } else {
                    cache[aCriticalHitTypeString] = new CriticalHitCollection({}, {type: aCriticalHitTypeString});
                    cache[aCriticalHitTypeString].fetch();
                    cache[aCriticalHitTypeString].on('sync', function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.getAllTypes = function() {
                var deferred = $.Deferred();
                var allTypesCacheKey = 'allTypes';
                if (cache[allTypesCacheKey]) {
                    deferred.resolve(cache[allTypesCacheKey]);
                } else {
                    cache[allTypesCacheKey] = new CriticalHitTypeCollection();
                    cache[allTypesCacheKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            this.addType = function(typeAttributes) {
                var deferred = $.Deferred();

                $.when(self.getAllTypes()).then (
                    function(allTypesCollection) {
                        allTypesCollection.add(typeAttributes);

                    }
                )

                return deferred.promise();
            }
        };

        var myCriticalHitWarehouse = new CriticalHitWarehouse();

        return myCriticalHitWarehouse;

    });