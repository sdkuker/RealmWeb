define(['marionette',
    'realmApplication',
    'models/authentication/firebaseUIAuthenticationUserModel',
    "tpl!templates/authentication/authenticationSignedOutTemplate.tpl",
    'logger',
], function (Marionette, RealmApplication, AuthenticationUserModel, AuthenticationSignedOutTemplate, Logger) {
    var AuthenticationSignedOutView = Marionette.ItemView.extend({
        template: AuthenticationSignedOutTemplate,
        firebaseUIUser : null,
        model : AuthenticationUserModel,
    });

    return AuthenticationSignedOutView;

});
