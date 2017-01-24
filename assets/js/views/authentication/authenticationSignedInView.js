define(['marionette',
    'realmApplication',
    'models/authentication/firebaseUIAuthenticationUserModel',
    "tpl!templates/authentication/authenticationSignedInTemplate.tpl",
    'logger',
    'services/playerWarehouse'
], function (Marionette, RealmApplication, AuthenticationUserModel, AuthenticationSignedInTemplate, Logger, PlayerWarehouse) {
    var PlayerView = Marionette.ItemView.extend({
        template: AuthenticationSignedInTemplate,
        firebaseUIUser : null,
        model : AuthenticationUserModel,
        events: {
            'click #signOutButton' : 'signOutButtonClicked'
        },
        signOutButtonClicked : function() {
            self = this;
            // add the signout stuff here
        }
    });

    return PlayerView;

});
