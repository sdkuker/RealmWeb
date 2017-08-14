define(['marionette',
        "tpl!templates/movementManeuver/movementManeuverLayoutTemplate.tpl"],
    function (Marionette, MovementManeuverLayoutTemplate) {

        var MovementManeuverLayoutView = Marionette.LayoutView.extend({
            template: MovementManeuverLayoutTemplate,
            regions : {
                movementManeuverFilterRegion : '#movementManeuverFilterRegion',
                movementManeuverDisplayRegion : '#movementManeuverDisplayRegion'
            }
        });

        return MovementManeuverLayoutView;

    });
