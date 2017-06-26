define(['marionette',
    'realmApplication',
    'models/item/itemModel',
    'utility/viewUtilities',
    "tpl!templates/item/itemTemplate.tpl",
    'logger',
    'services/itemWarehouse'
], function (Marionette, RealmApplication, ItemModel, ViewUtilities, ItemTemplate, Logger, ItemWarehouse) {
    var ItemView = Marionette.ItemView.extend({
        template: ItemTemplate,
        model: ItemModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked'
        },
        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },
        saveButtonClicked : function() {
            self = this;
            var newName = $('#ItemName').val();
            var newWill = $('#ItemWill').val();
            var newWillModifier = $('#ItemWillModifier').val();
            this.model.set('name', newName);
            this.model.set('will', newWill);
            this.model.set('willModifier', newWillModifier);
            // if it's a new model, add it to the collection
            if (! this.model.get('id')) {
                Logger.logInfo('About to add a new item model to the collection');
                $.when(ItemWarehouse.getAllItems()).then(
                    function(myItemCollection) {
                        myItemCollection.add({name : newName, will : newWill, willModifier : newWillModifier});
                        ViewUtilities.showModalView('Informational', 'Item Saved');
                        RealmApplication.vent.trigger('viewItemList');
                    }
                ),
                    function() {
                        console.log('some kind of error getting items for addition of item');
                    }
            } else {
                // don't have to do anything if it's modifying an existing model -
                // firebase does that automatically
                ViewUtilities.showModalView('Informational', 'Item Saved');
                RealmApplication.vent.trigger('viewItemList');
            }

        },
        deleteButtonClicked : function() {
            this.model.destroy().then(
                function(itemModel) {
                    Logger.logInfo('item model successfully saved');
                    ViewUtilities.showModalView('Informational', 'Item Saved');
                    RealmApplication.vent.trigger('viewItemList');
                },
                function(error) {
                    Logger.logErrror("item model NOT successfully saved: " + error);
                    ViewUtilities.showModalView('Error', 'Error Saving the Item.  See the log');
                }
            );
        }
    });

    return ItemView;

});
