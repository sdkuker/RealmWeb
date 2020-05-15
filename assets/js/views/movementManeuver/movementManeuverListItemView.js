define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuver/movementManeuverListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverDisplayModel',], 
    function (Marionette, RealmApplication, MovementManeuverListItemTemplate, 
        MovementManeuverDisplayModel) {
        var MovementManeuverListItemView = Marionette.ItemView.extend({
            tagName: 'li',
            model: MovementManeuverDisplayModel,
            template: MovementManeuverListItemTemplate
        });

        return MovementManeuverListItemView;

    });
