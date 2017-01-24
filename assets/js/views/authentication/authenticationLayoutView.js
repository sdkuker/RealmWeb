define(['marionette',
        "tpl!templates/authentication/authenticationLayoutTemplate.tpl",
        'models/authentication/firebaseUIAuthenticationUserModel',
        'views/authentication/authenticationSignedInView'],
    function (Marionette, AuthenticationLayoutTemplate, AuthenticationUserModel, AuthenticationSignedInView) {

        var AuthenticationLayoutView = Marionette.LayoutView.extend({
            template: AuthenticationLayoutTemplate,
            regions : {
                userStateRegion : '#userStateRegion'
            },
            signedInView : null,
            authUI : null,
            onRender: function() {
                var self = this;
                if (! self.authUI) {
                    self.signedInView = new AuthenticationSignedInView({model: new AuthenticationUserModel()});
                    // FirebaseUI config.
                    var uiConfig = {
                        signInOptions: [
                            firebase.auth.FacebookAuthProvider.PROVIDER_ID
                        ],
                        callbacks: {
                            'signInSuccess': function (user, credential, redirectUrl) {
                                self.handleSignedInUser(user);
                                // do not redirect
                                return false;
                            }
                        }
                    };

                    // Initialize the FirebaseUI Widget using Firebase.
                    self.authUI = new firebaseui.auth.AuthUI(firebase.auth());
                    var authContainer = self.$el.find('#firebaseAuthContainer')[0];
                    // The start method will wait until the DOM is loaded.
                    self.authUI.start(authContainer, uiConfig);
                }
            },
            handleSignedInUser: function(user) {
                var self = this;
                self.signedInView.firebaseUIUser = user;
                self.signedInView.model.set('name', user.displayName);
                self.signedInView.model.set('photo', user.photoURL);
                self.getRegion('userStateRegion').show(self.signedInView);
                // show/render the signed in user view
            }
        });

        return AuthenticationLayoutView;

    });
