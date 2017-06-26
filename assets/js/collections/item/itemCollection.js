define(['backbone', 'firebase', 'backfire', 'models/item/itemModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, ItemModel, ServiceConstants, Config) {

        var ItemCollection = Backbone.Firebase.Collection.extend({
            model: ItemModel,
            url: ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/items',
            getAll: function() {
                return this.get('name');
            },
            comparator: function(item) {
                return item.get('name');
            }
        });

        return ItemCollection;

    });
