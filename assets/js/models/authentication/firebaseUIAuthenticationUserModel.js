define(['backbone', 'services/playerWarehouse'],
    function (Backbone, PlayerWarehouse) {

        var FirebaseUIAuthenticationUserModel = Backbone.Model.extend({
            defaults: {
                name : null,
                phote : null
            },

        });

        return FirebaseUIAuthenticationUserModel;

    });
