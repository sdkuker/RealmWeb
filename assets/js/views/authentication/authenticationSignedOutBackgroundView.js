define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    "tpl!templates/authentication/authenticationSignedOutTemplate.tpl",
    'logger',
], function (Marionette, RealmApplication, PlayerModel, AuthenticationSignedOutTemplate, Logger) {
    var AuthenticationSignedOutView = Marionette.ItemView.extend({
        template: AuthenticationSignedOutTemplate,
        firebaseUIUser : null,
        model : PlayerModel
    });

    return AuthenticationSignedOutView;

});
