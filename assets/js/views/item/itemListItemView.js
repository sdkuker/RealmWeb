define(['marionette',
    'realmApplication',
    "tpl!templates/item/itemListItemTemplate.tpl",
    'models/item/itemModel'], function (Marionette, RealmApplication,
            ItemListItemTemplate, ItemModel) {
    var ItemListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : ItemModel,
        template: ItemListItemTemplate,
        events : {
            'click' : 'itemSelected'
        },
        itemSelected : function(event) {
            RealmApplication.vent.trigger('itemListItemSelected', this, this.model);
        }
    });

    return ItemListItemView;

});
