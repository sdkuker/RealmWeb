define(['marionette',
        'realmApplication',
        "tpl!templates/authentication/authenticationLayoutTemplate.tpl",
        'models/authentication/firebaseUIAuthenticationUserModel',
        'views/authentication/authenticationSignedInView'],
    function (Marionette, RealmApplication, AuthenticationLayoutTemplate, AuthenticationUserModel, AuthenticationSignedInView) {

        var AuthenticationLayoutView = Marionette.LayoutView.extend({
            template: AuthenticationLayoutTemplate,
            regions : {
                userStateRegion : '#userStateRegion'
            },
            initialize : function() {
                var self = this;
                steviewareAuthUI = null;
                steviewareAuthLayoutView = this;
                RealmApplication.vent.bind('authenticationSignedInView:userSignedOutSuccessfully', function() {
                    self.handleUserSignedOut();
                });
                firebase.auth().onAuthStateChanged(self.handleAuthStateChangedEvent);
            },
            signedInView : null,
            onRender: function() {
                var self = this;
                if (! steviewareAuthUI) {
                    self.signedInView = new AuthenticationSignedInView({model: new AuthenticationUserModel()});
                    // FirebaseUI config.
                    var uiConfig = {
                        signInOptions: [
                            firebase.auth.FacebookAuthProvider.PROVIDER_ID
                        ],
                        // callbacks: {
                        //     'signInSuccess': function (user, credential, redirectUrl) {
                        //         self.handleSignedInUser(user);
                        //         // do not redirect
                        //         return false;
                        //     }
                        // }
                    };

                    // Initialize the FirebaseUI Widget using Firebase.
                    steviewareAuthUI = new firebaseui.auth.AuthUI(firebase.auth());
                }
                var authContainer = self.$el.find('#firebaseAuthContainer')[0];
                // The start method will wait until the DOM is loaded.
                steviewareAuthUI.start(authContainer, uiConfig);

            },
            handleSignedInUser: function(user) {
                var self = this;
                self.signedInView.firebaseUIUser = user;
                self.signedInView.model.set('name', user.displayName);
                self.signedInView.model.set('photo', user.photoURL);
                self.getRegion('userStateRegion').show(self.signedInView);
                steviewareAuthUI.reset();
                // show/render the signed in user view
            },
            handleUserSignedOut : function() {
                var self = this;
                steviewareAuthUI = null;
                self.render();
            },
            handleAuthStateChangedEvent: function(user, thing2, thing3) {
                if (user) {
                    steviewareAuthLayoutView.handleSignedInUser(user);
                }
            }
        });

        return AuthenticationLayoutView;

    });
