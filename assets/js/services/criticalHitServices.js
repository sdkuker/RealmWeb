define(['jquery',
        'parse',
        'logger',
        'collections/criticalHit/criticalHitCollection',
        'collections/criticalHit/criticalHitTypeCollection'],
    function ($, Parse, Logger, CriticalHitCollection, CriticalHitTypeCollection) {

        CriticalHitServices = function() {
            // private variables
            var self = this;
            // public functions
            this.getCriticalHitsForType = function(aCriticalHitTypeString) {
                var myCriticalHitCollection = new CriticalHitCollection();
                var deferred = $.Deferred();
                var queryParms = {'type':aCriticalHitTypeString};
               // var queryParms = {'$or': [{'type' : 'Acid'}, {'type' : 'Cold'}]};
                $.when(myCriticalHitCollection.fetch({query:queryParms})).then(
                    function(results)  {
                        Logger.logInfo('got critical hits from Parse for type: ' + aCriticalHitTypeString);
                        for (var index = 0; index < results.length; index++){
                            myCriticalHitCollection.add(results[index]);
                        };
                        deferred.resolve(myCriticalHitCollection);
                    },
                    function(error) {
                        var errorString = 'got error getting severity critical hits from Parse for type: ' + aCriticalHitTypeString + ' ' + error.code + ' ' + error.message;
                        Logger.logErrror(errorString);
                        deferred.reject(errorString);
                    }

                );
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
                var myCriticalHitTypeCollection = new CriticalHitTypeCollection();
                var deferred = $.Deferred();
                $.when(myCriticalHitTypeCollection.fetch()).then(
                    function(results)  {
                        Logger.logInfo('got critical hit type collection from Parse');
                        for (var index = 0; index < results.length; index++){
                            myCriticalHitTypeCollection.add(results[index]);
                        };
                        deferred.resolve(myCriticalHitTypeCollection);
                    },
                    function(error) {
                        var errorString = 'got error getting all critical hit types from Parse: ' + error.code + ' ' + error.message;
                        Logger.logErrror(errorString);
                        deferred.reject(errorString);
                    }
                );
                return deferred.promise();
                }
            };

        var myCriticalHitServices = new CriticalHitServices();

        return myCriticalHitServices;

    });