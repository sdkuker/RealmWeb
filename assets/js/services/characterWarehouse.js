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
            var allCharactersCollectionKey = 'allCharactersCollection';
            var absolutelyAllTheCharactersCollectionKey = 'absolutelyAllTheCharactersCollectionKey';

            // public functions

            this.getCharacterWithoutWaiting = function(characterID) {
                var myCharacter = cache[allCharactersCollectionKey].findWhere({id : characterID});
                return myCharacter;
            };

            this.addCharacter = function(characterAttributes) {
                var deferred = $.Deferred();

                $.when(getAbsolutelyAllTheCharacters()).then(
                    function(myCharacterCollection) {
                        myCharacterCollection.add(characterAttributes);
                        deferred.resolve();
                    }
                )
                return deferred.promise();
            }

            this.getAllCharacters = function() {
                var deferred = $.Deferred();
                if (cache[allCharactersCollectionKey]) {
                    deferred.resolve(cache[allCharactersCollectionKey]);
                } else {
                    cache[allCharactersCollectionKey] = new CharacterCollection();
                    cache[allCharactersCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            // private functions

            getAbsolutelyAllTheCharacters = function() {
                var deferred = $.Deferred();
                if (cache[absolutelyAllTheCharactersCollectionKey]) {
                    deferred.resolve(cache[absolutelyAllTheCharactersCollectionKey]);
                } else {
                    cache[absolutelyAllTheCharactersCollectionKey] = new CharacterCollection({'mode' : 'all'});
                    cache[absolutelyAllTheCharactersCollectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };
        };

        var myCharacterWarehouse = new CharacterWarehouse();

        return myCharacterWarehouse;

    });