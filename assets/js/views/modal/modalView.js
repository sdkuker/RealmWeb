define(['realmApplication', 'marionette',
    "tpl!templates/modal/modalTemplate.tpl"], function (RealmApplication, Marionette, ModalTemplate) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalTemplate,
        events: {
            'click .close': function(e) {
                e.preventDefault();
               // this.trigger('modal:close');
                if (this.model.getMode() == 'login') {
                    RealmApplication.vent.trigger('loginSuccessful');
                }
            }
        }
    });

    return ModalView;

});
