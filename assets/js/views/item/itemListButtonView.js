define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/item/itemListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, ItemListButtonTemplate) {

        var ItemListButtonView = Marionette.ItemView.extend({
            template: ItemListButtonTemplate,
            events : {
                'click #addButton' : 'addButtonClicked',
                'click #changeButton' : 'changeButtonClicked',
                'click #deleteButton' : 'deleteButtonClicked'
            },
            itemIsSelected : false,
            initialize : function() {
                var self = this;
                this.listenTo(RealmApplication.vent, 'viewItemList:itemSelected', function() {
                    self.itemSelected();
                });
            },
            onRender : function() {
                var self = this;
                if (self.itemIsSelected) {
                    $('#changeButton', this.$el).prop('disabled', false);
                    $('#deleteButton', this.$el).prop('disabled', false);
                } else {
                    $('#changeButton', this.$el).prop('disabled', true);
                    $('#deleteButton', this.$el).prop('disabled', true);
                }
            },
            addButtonClicked : function() {
                RealmApplication.vent.trigger('itemListAddButton:clicked');
            },
            changeButtonClicked : function() {
                RealmApplication.vent.trigger('itemListChangeButton:clicked');
            },
            deleteButtonClicked : function() {
                RealmApplication.vent.trigger('itemListDeleteButton:clicked');
            },
            itemSelected : function() {
                var self = this;
                self.itemIsSelected = true;
                self.render();
            }
        });

        return ItemListButtonView;

    });
