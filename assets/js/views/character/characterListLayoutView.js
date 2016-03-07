define(['marionette',
        "tpl!templates/character/characterListLayoutTemplate.tpl"],
    function (Marionette, CharacterListLayoutTemplate) {

        var CharacterListLayoutiew = Marionette.LayoutView.extend({
            template: CharacterListLayoutTemplate,
            regions : {
                characterTableRegion : '#characterTableRegion',
                buttonsRegion : '#buttonsRegion'
            }
        });

        return CharacterListLayoutiew;

    });
