define(['marionette',
        "tpl!templates/item/itemListLayoutTemplate.tpl"],
    function (Marionette, ItemListLayoutTemplate) {

        var ItemListLayoutiew = Marionette.LayoutView.extend({
            template: ItemListLayoutTemplate,
            regions : {
                itemTableRegion : '#itemTableRegion',
                buttonsRegion : '#buttonsRegion'
            }
        });

        return ItemListLayoutiew;

    });
