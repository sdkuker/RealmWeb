define(['realmApplication', 'marionette',  'models/player/playerModel',
    "tpl!templates/modal/modalLoginTemplate.tpl", "utility/viewUtilities", "services/playerWarehouse"],
    function (RealmApplication, Marionette, PlayerModel, ModalLoginTemplate, ViewUtilities, PlayerWarehouse) {
    var ModalView = Marionette.ItemView.extend({
        template: ModalLoginTemplate,
        playerModel: null,
        loginInProgressCookeName : "loginInProgress",
        initialize : function() {
            var self = this;
            modalLoginView = this;
            self.playerModel = new PlayerModel();
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
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
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
            modalLoginView.playerModel.set('name', aUser.displayName);
            modalLoginView.playerModel.set('id', aUser.uid);
            require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                AuthUIUtilities.getAuthUI().reset();
                AuthUIUtilities.setUser(aUser);
            });
            RealmApplication.vent.trigger('userIsSignedIn', modalLoginView.playerModel);
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
