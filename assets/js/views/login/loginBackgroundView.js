define(['marionette',
    "tpl!templates/login/loginBackground.tpl"], function (Marionette, LoginBackgroundTemplate) {
    var LoginBackgroundView = Marionette.ItemView.extend({
        template: LoginBackgroundTemplate
    });

    return LoginBackgroundView;

});
