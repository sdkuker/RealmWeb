define(['marionette',
    "tpl!templates/modal/modalLoginTemplate.tpl"], function (Marionette, ModalLoginTemplate) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalLoginTemplate,
        initialize : function() {
            var self = this;
            RealmApplication.vent.bind('authenticationSignedInView:userSignedOutSuccessfully', function() {
                self.handleUserSignedOutAndNotify(self);
            });
            firebase.auth().onAuthStateChanged(self.handleAuthStateChangedEvent);
        },
        uiConfig : {
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ]
        },
        events: {
            'click .close': function(e) {
                e.preventDefault();
            }
        }
    });

    return ModalView;

});
