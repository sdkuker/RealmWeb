define(["marionette",
    'views/modal/modalRegion'
], function (Marionette, ModalRegion) {

    var RealmApplication = new Marionette.Application();

    RealmApplication.on("before:start", function () {

        var RegionContainer = Marionette.LayoutView.extend({
            el: "#app-container",
            regions: {
                authRegion: '#auth-region',
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

        require(["views/navigation/navigationView", 'views/authentication/authenticationLayoutView', 'router/router', 'router/routerEventHandler', 'services/characterWarehouse'],
            function (NavigationView, AuthentiationLayoutView, RealmRouter, RouterEventHandler, CharacterWarehouse) {

                //prefetch characters for combat view later
                CharacterWarehouse.getAllCharacters();

                var config = {
                    apiKey: "AIzaSyCnQbVXRg5L0xUSQeCc8OIo3VHU7PEir4M",
                    authDomain: "stevieware.firebaseapp.com",
                    databaseURL: "https://stevieware.firebaseio.com",
                    storageBucket: "project-5301189612815518460.appspot.com",
                    messagingSenderId: "949261816871"
                };
                firebase.initializeApp(config);

                // var authLayoutView = new AuthentiationLayoutView();
                // RealmApplication.regions.authRegion.show(authLayoutView);

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
