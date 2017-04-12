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
                    self.handleUserSignedOutAndNotify(self);
                });
            },
            uiConfig : {
                signInOptions: [
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID
                ]
            },
            signedInView : new AuthenticationSignedInView({model: new AuthenticationUserModel()}),
            userSignedIn : false,
            handleSignedInUser: function(user) {
                var self = this;
                self.userSignedIn = true;
                self.signedInView.firebaseUIUser = user;
                self.signedInView.model.set('name', user.displayName);
                self.signedInView.model.set('photo', user.photoURL);
                self.getRegion('userStateRegion').show(self.signedInView);
                require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                    AuthUIUtilities.getAuthUI().reset();
                    AuthUIUtilities.setUser(user);
                });
                RealmApplication.vent.trigger('userSignedIn');
            },
            handleUserNotSignedIn : function(layoutView) {
                require(['utility/firebaseAuthUIUtilities'], function(AuthUIUtilities) {
                    layoutView.userSignedIn = false;
                    layoutView.getRegion('userStateRegion').reset();
                  //  AuthUIUtilities.getAuthUI().reset();
                    var authContainer = $('#firebaseAuthContainer')[0];
                    // The start method will wait until the DOM is loaded.
                    AuthUIUtilities.getAuthUI().start(authContainer, layoutView.uiConfig);
                    AuthUIUtilities.setUser(null);
                });
            },
            handleUserSignedOutAndNotify : function(layoutView) {
                var self = this;
                self.handleUserNotSignedIn(layoutView);
                RealmApplication.vent.trigger('userSignedOut');
            },
            handleAuthStateChangedEvent: function(user) {
                if (user) {
                    steviewareAuthLayoutView.handleSignedInUser(user);
                }
            }
        });

        return AuthenticationLayoutView;

    });
