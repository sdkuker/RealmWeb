define(['marionette',
        "tpl!templates/character/characterListLayoutTemplate.tpl"],
    function (Marionette, CharacterListLayoutTemplate) {

        var CharacterListLayoutView = Marionette.LayoutView.extend({
            template: CharacterListLayoutTemplate,
            regions : {
                characterTableSortRegion : '#characterTableSortRegion',
                characterTableRegion : '#characterTableRegion',
                buttonsRegion : '#buttonsRegion'
            }
        });

        return CharacterListLayoutView;

    });
