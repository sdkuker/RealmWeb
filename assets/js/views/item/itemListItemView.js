define(['marionette',
    'realmApplication',
    'services/playerWarehouse',
    "tpl!templates/item/itemListItemTemplate.tpl",
    'models/item/itemModel'], function (Marionette, RealmApplication, PlayerWarehouse,
            ItemListItemTemplate, ItemModel) {
    var ItemListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : ItemModel,
        template: ItemListItemTemplate,
        templateHelpers : function() {
            var myWill = PlayerWarehouse.getPlayerLoggedIn().get('administrator') ? this.model.get('will') : 'Guess';
            var myWillModifier = PlayerWarehouse.getPlayerLoggedIn().get('administrator') ? this.model.get('willModifier') : 'Not telling!';
            return {
                theWill : myWill,
                theWillModifier : myWillModifier
            }
        },

        events : {
            'click' : 'itemSelected'
        },
        itemSelected : function(event) {
            RealmApplication.vent.trigger('itemListItemSelected', this, this.model);
        }
    });

    return ItemListItemView;

});
