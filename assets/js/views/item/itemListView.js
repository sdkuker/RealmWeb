define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/item/itemModel',
    "tpl!templates/item/itemListTemplate.tpl",
    'views/item/itemListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, ItemModel, ItemListTemplate, ItemView) {
    var ItemListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'itemTable',
        className : 'table table-striped',
        template: ItemListTemplate,
        childView : ItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'itemListAddButton:clicked', function() {
                self.triggerAddItemFunction();
            });
            this.listenTo(RealmApplication.vent, 'itemListChangeButton:clicked', function() {
                self.triggerEditItemFunction();
            });
            this.listenTo(RealmApplication.vent, 'itemListDeleteButton:clicked', function() {
                self.triggerDeleteItemFunction();
            });
            this.listenTo(RealmApplication.vent, 'itemListItemSelected', function(tableRow, model) {
                self.itemSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        triggerAddItemFunction : function() {
            RealmApplication.vent.trigger('itemListAddItem', new ItemModel());
        },
        triggerEditItemFunction : function() {
            RealmApplication.vent.trigger('itemListChangeItem', this.selectedModel);
        },
        triggerDeleteItemFunction : function() {
            this.collection.remove(this.selectedModel);
            Logger.logInfo('item model deleted');
            ViewUtilities.showModalView('Informational', 'Item named: ' + this.selectedModel.get('name') + ' Deleted');
            this.selectedModel = null;
            RealmApplication.vent.trigger('viewItemList');
        },
        itemSelected : function(tableRow, model) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            this.selectedModel = model;
            RealmApplication.vent.trigger('viewItemList:itemSelected');
        }
    });

    return ItemListView;

});
