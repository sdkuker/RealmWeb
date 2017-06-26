define(['realmApplication',
        'jquery',
        'logger',
        'collections/item/itemCollection'],
    function (RealmApplication, $, Logger, ItemCollection) {

        // I am the first stop for getting items.  If I don't have them, I'll get them from Firebase
        // and put them in my cache.  If I have them in my cache, I'll return them.

        ItemWarehouse = function() {
            // all variables are private
            var self = this;
            var cache = {};
            var collectionKey = 'itemCollection';

            // public functions
            this.getAllItems = function() {
                var deferred = $.Deferred();
                $.when(getItemCollection()).then(
                    function(myItemCollection) {
                        deferred.resolve(myItemCollection);
                    }
                )
                return deferred.promise();
            };

            this.getItemWithID = function(itemID) {
                var deferred = $.Deferred();
                $.when(getItemCollection()). then(
                    function(itemCollection) {
                        deferred.resolve(itemCollection.get(itemID));
                    }
                )

                return deferred.promise();
            };

            this.getItemWithName = function(itemName) {
                var deferred = $.Deferred();
                $.when(getItemCollection()). then(
                    function(itemCollection) {
                        deferred.resolve(itemCollection.findWhere({name: itemName}));
                    }
                )

                return deferred.promise();
            };

            // private functions
            getItemCollection = function() {
                var deferred = $.Deferred();
                if (cache[collectionKey]) {
                    deferred.resolve(cache[collectionKey]);
                } else {
                    cache[collectionKey] = new ItemCollection();
                    cache[collectionKey].on('sync',function(collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

        };

        var myItemWarehouse = new ItemWarehouse();

        return myItemWarehouse;

    });