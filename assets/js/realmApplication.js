define(["marionette"
], function (Marionette) {

    var RealmApplication = new Marionette.Application();

    RealmApplication.on("before:start", function () {

        var RegionContainer = Marionette.LayoutView.extend({
            el: "#app-container",
            regions: {
                navRegion: "#nav-region",
                mainRegion: "#main-region",
                footerRegion: "#footer-region"
            }
        });
        RealmApplication.regions = new RegionContainer();
    });

    RealmApplication.on("start", function () {
        console.log("Starting Realm Application");

        require(["views/navigation/navigationView", 'router/router'], function (NavigationView, RealmRouter) {
            var navView = new NavigationView();
            RealmApplication.regions.navRegion.show(navView);

            var appRouter = RealmRouter;
            if (Backbone.history) {
                Backbone.history.start();
            };
        });

    });

    return RealmApplication;
});
