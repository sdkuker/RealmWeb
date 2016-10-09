define(["marionette",
    'views/modal/modalRegion'
], function (Marionette, ModalRegion) {

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

        RealmApplication.addRegions({
            modalRegion: ModalRegion
        });
    });

    RealmApplication.on("start", function () {

        require(["views/navigation/navigationView", 'router/router', 'router/routerEventHandler', 'services/characterWarehouse'],
            function (NavigationView, RealmRouter, RouterEventHandler, CharacterWarehouse) {

                //prefetch characters for combat view later
                CharacterWarehouse.getAllCharacters();

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
