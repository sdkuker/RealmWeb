define(['realmApplication', 'marionette',  'models/authentication/firebaseUIAuthenticationUserModel',
    "tpl!templates/modal/modalLoginTemplate.tpl", "utility/viewUtilities"],
    function (RealmApplication, Marionette, AuthenticationUserModel, ModalLoginTemplate, ViewUtilities) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalLoginTemplate,
        authenticationUserModel: null,
        loginInProgressCookeName : "loginInProgress",
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
          //  signInSuccessUrl: 'loggedIn.html',
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ]
        },
        events: {
            'click .close': function(e) {
                e.preventDefault();
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
