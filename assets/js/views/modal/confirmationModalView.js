define(['realmApplication', 'marionette',
    "tpl!templates/modal/confirmationModalTemplate.tpl"], function ( RealmApplication, Marionette, ModalTemplate) {
    var ConfirmationModalView = Marionette.ItemView.extend({
        template: ModalTemplate,
        events: {
            'click #yesButton' : 'yesButtonClicked',
            'click #noButton' : 'noButtonClicked'
        },
        yesButtonClicked : function(e) {
            e.preventDefault();
            RealmApplication.vent.trigger('confirmationModalViewYesButton:clicked');
        },
        noButtonClicked : function(e) {
            e.preventDefault();
            RealmApplication.vent.trigger('confirmationModalViewNoButton:clicked');
        },
    });

    return ConfirmationModalView;

});
