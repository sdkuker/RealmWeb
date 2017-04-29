define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    "tpl!templates/authentication/authenticationSignedInTemplate.tpl",
    'logger'
], function (Marionette, RealmApplication, PlayerModel, AuthenticationSignedInTemplate, Logger) {
    var AuthenticationSignedInView = Marionette.ItemView.extend({
        template: AuthenticationSignedInTemplate,
        firebaseUIUser : null,
        model : PlayerModel,
        events: {
            'click #signOutButton' : 'signOutButtonClicked'
        },
        templateHelpers : function() {
            return {
                playerType : this.model.get('administrator') ? 'Administrator' : ' '
            }
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
