define(['jquery',
        'parse',
        'logger',
        'collections/criticalHit/criticalHitCollection'],
    function ($, Parse, Logger, CriticalHitCollection) {

        CriticalHitServices = function() {
            // all variables are private
            var self = this;

            // putlic functions
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
            }
        };

        var myCriticalHitServices = new CriticalHitServices();

        return myCriticalHitServices;

    });