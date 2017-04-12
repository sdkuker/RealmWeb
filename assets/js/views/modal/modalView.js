define(['marionette',
    "tpl!templates/modal/modalTemplate.tpl"], function ( Marionette, ModalTemplate) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalTemplate,
        events: {
            'click .close': function(e) {
                e.preventDefault();
            }
        }
    });

    return ModalView;

});
