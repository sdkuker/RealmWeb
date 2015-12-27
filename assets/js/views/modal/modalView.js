define(['marionette',
    "tpl!templates/modal/modalTemplate.tpl"], function (Marionette, ModalTemplate) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalTemplate
    });

    return ModalView;

});
