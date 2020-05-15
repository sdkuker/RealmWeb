define(['backbone'],
    function (Backbone) {

        var MovementManeuverDisplayModel = Backbone.Model.extend({
            defaults: {
                description : ''
            }
        });

        return MovementManeuverDisplayModel;

    });
