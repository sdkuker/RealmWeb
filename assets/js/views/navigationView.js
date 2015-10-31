define(['marionette',
        "tpl!templates/navigation/navControls.tpl"], function (Marionette, NavControlsTemplate) {
    var NavigationView = Marionette.ItemView.extend({
        template: NavControlsTemplate
    });

    return new NavigationView();

});
