define(['jquery',
        'logger',
        'collections/character/characterCollection'],
    function ($, Logger, CharacterCollection) {

        // I am the first stop for getting characters.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        CharacterWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};

            // public functions
            this.getAllCharacters = function() {
                var deferred = $.Deferred();
                var collectionKey = 'characterCollection';
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new CharacterCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myCharacterWarehouse = new CharacterWarehouse();

        return myCharacterWarehouse;

    });