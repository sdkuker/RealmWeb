define(['jquery',
        'parse',
        'logger',
        'collections/criticalHit/criticalHitCollection',
        'collections/criticalHit/criticalHitTypeCollection',
        'services/criticalHitServices'],
    function ($, Parse, Logger, CriticalHitCollection, CriticalHitTypeCollection, CriticalHitServices) {

        // I am the first stop for getting critical hits.  If I don't have them, I'll get them from Parse
        // and put them in my cache.  If I have them in my cache, I'll return them.  Assumes that they will
        // not be updated in parse during my lifetime

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
                    $.when(CriticalHitServices.getCriticalHitsForType(aCriticalHitTypeString)).then(
                        function(criticalHitCollection) {
                            cache[aCriticalHitTypeString] = criticalHitCollection;
                            deferred.resolve(cache[aCriticalHitTypeString]);
                        },
                        function(errorString) {
                            deferred.reject(errorString);
                        }
                    )
                }

                return deferred.promise();

            };

            this.getAllCriticalHits = function() {
                var myCriticalHitCollection = new CriticalHitCollection();
                var deferred = $.Deferred();
                $.when(myCriticalHitCollection.fetch()).then(
                    function(results)  {
                        Logger.logInfo('got critical hit list from Parse');
                        for (var index = 0; index < results.length; index++){
                            myCriticalHitCollection.add(results[index]);
                        };
                        deferred.resolve(myCriticalHitCollection);
                    },
                    function(error) {
                        var errorString = 'got error getting all critical hits from Parse: ' + error.code + ' ' + error.message;
                        Logger.logErrror(errorString);
                        deferred.reject(errorString);
                    }
                );
                return deferred.promise();
            };

            this.getAllTypes = function() {
                var self = this;
                var deferred = $.Deferred();
                var allTypesCacheKey = 'allTypes';
                if (cache[allTypesCacheKey]) {
                    deferred.resolve(cache[allTypesCacheKey]);
                } else {
                    $.when(CriticalHitServices.getAllTypes()).then(
                        function(criticalHitTypeCollection) {
                            cache[allTypesCacheKey] = criticalHitTypeCollection;
                            deferred.resolve(cache[allTypesCacheKey]);
                        },
                        function(errorString) {
                            deferred.reject(errorString);
                        }
                    )
                }

                return deferred.promise();
            }
        };

        var myCriticalHitWarehouse = new CriticalHitWarehouse();

        return myCriticalHitWarehouse;

    });