define(["marionette"
], function (Marionette) {

    var RealmApplication = new Marionette.Application();

    RealmApplication.on("before:start", function () {

        var RegionContainer = Marionette.LayoutView.extend({
            el: "#app-container",
            regions: {
                navRegion: "#nav-region",
                mainRegion: "#main-region",
                footerRegion: "#footer-region",
                modalRegion: '#modal-region'
            }
        });
        RealmApplication.regions = new RegionContainer();
    });

    RealmApplication.on("start", function () {
        console.log("Starting Realm Application");

        require(["views/navigation/navigationView", 'router/router', 'router/routerEventHandler'], function (NavigationView, RealmRouter, RouterEventHandler) {
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
