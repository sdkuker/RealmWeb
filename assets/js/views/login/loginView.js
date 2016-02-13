define(['jquery',
    'marionette',
    "tpl!templates/login/login.tpl",
    "models/login/userModel"], function ($, Marionette, LoginTemplate, UserModel) {
    var DieRollerView = Marionette.ItemView.extend({
        template: LoginTemplate,
        model: UserModel,
        events: {
            'click #loginButton' : 'loginButtonClicked'
        },

        loginButtonClicked : function() {
            self = this;
            this.model.roll(self.numberOfDice);
        }
    });

    return DieRollerView;

});
