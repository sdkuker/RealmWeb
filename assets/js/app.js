define(["marionette",
        "views/navigationView"], function (Marionette, NavigationView ) {
        var Realm = new Marionette.Application();

        Realm.navigate = function (route, options) {
            options || (options = {});
            Backbone.history.navigate(route, options);
        };

        Realm.getCurrentRoute = function () {
            return Backbone.history.fragment
        };

        Realm.on("before:start", function () {
            var RegionContainer = Marionette.LayoutView.extend({
                el: "#app-container",

                regions: {
                    header: "#header-region",
                    main: "#main-region",
                    dialog: "#dialog-region"
                }
            });

            Realm.regions = new RegionContainer();
            Realm.regions.dialog.onShow = function (view) {
                var self = this;
                var closeDialog = function () {
                    self.stopListening();
                    self.empty();
                    self.$el.dialog("destroy");
                };
                this.listenTo(view, "dialog:close", closeDialog);

                this.$el.dialog({
                    modal: true,
                    title: view.title,
                    width: "auto",
                    close: function (e, ui) {
                        closeDialog();
                    }
                });
            };
        });
        Realm.on("start", function () {
            console.log("Realm has started");
            if (Backbone.history) {
                Backbone.history.start();
            };
            Realm.regions.main.show(NavigationView);
        });

        return Realm;
});
