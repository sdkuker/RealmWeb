define(["marionette"], function (Marionette) {
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
            // edited for brevity
        });

        Realm.regions = new RegionContainer();
        Realm.regions.dialog.onShow = function (view) {
            // edited for brevity
        };
    });

    Realm.on("start", function () {
        console.log("Realm has started");
        if (Backbone.history) {
            Backbone.history.start();

            if (this.getCurrentRoute() === "") {
                Realm.trigger("contacts.list");
            }
        }
    });

    return Realm;
});
