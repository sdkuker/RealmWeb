define(['backbone', 'models/movementManeuver/movementManeuverDisplayModel'],
    function (Backbone, MovementManeuverDisplayModel) {

        var MovementManeuverDisplayCollection = Backbone.Collection.extend({
            model: MovementManeuverDisplayModel,
            comparator: function(description) {
                return maneuver.get('description');
            },
        });

        return MovementManeuverDisplayCollection;

    });
