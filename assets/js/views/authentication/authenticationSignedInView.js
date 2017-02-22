define(['marionette',
    'realmApplication',
    'models/authentication/firebaseUIAuthenticationUserModel',
    "tpl!templates/authentication/authenticationSignedInTemplate.tpl",
    'logger',
    'services/playerWarehouse'
], function (Marionette, RealmApplication, AuthenticationUserModel, AuthenticationSignedInTemplate, Logger, PlayerWarehouse) {
    var AuthenticationSignedInView = Marionette.ItemView.extend({
        template: AuthenticationSignedInTemplate,
        firebaseUIUser : null,
        model : AuthenticationUserModel,
        events: {
            'click #signOutButton' : 'signOutButtonClicked'
        },
        signOutButtonClicked : function() {
            self = this;
            firebase.auth().signOut().then(function() {
                RealmApplication.vent.trigger('authenticationSignedInView:userSignedOutSuccessfully');
            }, function(error) {
                console.log('error in signout');
            });

        }
    });

    return AuthenticationSignedInView;

});
