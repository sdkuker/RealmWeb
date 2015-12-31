define(['parse',
        'logger',
        'collections/criticalHit/criticalHitCollection'],
    function (Parse, Logger, CriticalHitCollection) {

        CriticalHitServices = function() {
            // all variables are private
            var self = this;

            // putlic functions
            this.getAllCriticalHits = function() {
                var myCriticalHitCollection = new CriticalHitCollection();
                myCriticalHitCollection.fetch().then(
                    function(results)  {
                        Logger.logInfo('got critical hit list from Parse');
                        for (var index = 0; index < results.length; index++){
                            myCriticalHitCollection.add(results[index]);
                        }
                    },
                    function(error) {
                        Logger.logErrror('got error getting all critical hits from Parse: ' + error.code + ' ' + error.message)
                    }

                );
                return myCriticalHitCollection;
            }
        };

        var myCriticalHitServices = new CriticalHitServices();

        return myCriticalHitServices;

    });