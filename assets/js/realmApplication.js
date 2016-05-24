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

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCnQbVXRg5L0xUSQeCc8OIo3VHU7PEir4M",
            authDomain: "stevieware.firebaseapp.com",
            databaseURL: "https://stevieware.firebaseio.com",
            storageBucket: "",
        };

        firebase.initializeApp(config);
    });

    RealmApplication.on("start", function () {

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
