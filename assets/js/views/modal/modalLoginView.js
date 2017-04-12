define(['realmApplication', 'marionette',  'models/authentication/firebaseUIAuthenticationUserModel',
    "tpl!templates/modal/modalLoginTemplate.tpl"], function (RealmApplication, Marionette, AuthenticationUserModel,
                                                             ModalLoginTemplate) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalLoginTemplate,
        authenticationUserModel: null,
        initialize : function() {
            var self = this;
            modalLoginView = this;
            self.authenticationUserModel = new AuthenticationUserModel();
            firebase.auth().onAuthStateChanged(self.handleAuthStateChangedEvent);
        },
        uiConfig : {
            callbacks: {
                signInSuccess: function(currentUser, credential, redirectUrl) {
                    return false;
                }
            },
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ]
        },
        events: {
            'click .close': function(e) {
                e.preventDefault();
                RealmApplication.vent.trigger('loginSuccessful');
            }
        },
        onRender: function() {
            var self = this;
            self.handleUserNotSignedIn(self);
        },
        handleSignedInUser : function(aUser) {
            //$('#loginModal').modal("hide");
            $("[data-dismiss=modal]").trigger({ type: "click" });
            modalLoginView.authenticationUserModel.set('name', aUser.displayName);
            modalLoginView.authenticationUserModel.set('photo', aUser.photoURL);
            require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                AuthUIUtilities.getAuthUI().reset();
                AuthUIUtilities.setUser(aUser);
            });
            RealmApplication.vent.trigger('userIsSignedIn', modalLoginView.authenticationUserModel);
        },
        handleUserNotSignedIn : function(loginView) {
            require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                //loginView.getRegion('userStateRegion').reset();
                //AuthUIUtilities.getAuthUI().reset();
                var authContainer = $('#firebaseAuthLoginContainer')[0];
                // The start method will wait until the DOM is loaded.
                AuthUIUtilities.getAuthUI().start(authContainer, loginView.uiConfig);
                AuthUIUtilities.setUser(null);
            });
        },
        handleAuthStateChangedEvent: function(user) {
            if (user) {
                modalLoginView.handleSignedInUser(user);
            }
        }
    });

    return ModalView;

});
