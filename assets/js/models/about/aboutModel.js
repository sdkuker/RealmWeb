define(['backbone', 'about'],
    function (Backbone, About) {

        var AboutModel = Backbone.Model.extend({

            getVersion: function() {
                return  About.version;
            }
        });

        return AboutModel;

    });
