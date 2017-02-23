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
                    self.handleUserSignedOut(self);
                });
                firebase.auth().onAuthStateChanged(self.handleAuthStateChangedEvent);
            },
            uiConfig : {
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
            },
            signedInView : new AuthenticationSignedInView({model: new AuthenticationUserModel()}),
            userSignedIn : false,
            onRender: function() {
                var self = this;
                if (! self.userSignedIn) {
                    self.handleUserSignedOut(self);
                }

            },
            handleSignedInUser: function(user) {
                var self = this;
                self.signedInView.firebaseUIUser = user;
                self.signedInView.model.set('name', user.displayName);
                self.signedInView.model.set('photo', user.photoURL);
                self.getRegion('userStateRegion').show(self.signedInView);
                require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                    AuthUIUtilities.getAuthUI().reset();
                })
            },
            handleUserSignedOut : function(layoutView) {
                require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                    layoutView.userSignedIn = false;
                    layoutView.getRegion('userStateRegion').reset();
                  //  AuthUIUtilities.getAuthUI().reset();
                    var authContainer = $('#firebaseAuthContainer')[0];
                    // The start method will wait until the DOM is loaded.
                    AuthUIUtilities.getAuthUI().start(authContainer, layoutView.uiConfig);
                })
            },
            handleAuthStateChangedEvent: function(user) {
                if (user) {
                    steviewareAuthLayoutView.handleSignedInUser(user);
                }
            }
        });

        return AuthenticationLayoutView;

    });
