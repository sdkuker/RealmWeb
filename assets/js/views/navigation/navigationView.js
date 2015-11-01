define(['marionette',
        "tpl!templates/navigation/navControls.tpl"], function (Marionette, NavControlsTemplate) {
    var navigationView = Marionette.ItemView.extend({
        template: NavControlsTemplate
    });

    return navigationView;

});
