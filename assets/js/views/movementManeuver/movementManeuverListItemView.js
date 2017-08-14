define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuver/movementManeuverListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverModel'], function (Marionette, RealmApplication, MovementManeuverListItemTemplate, MovementManeuverModel) {
    var MovementManeuverListItemView = Marionette.ItemView.extend({
        tagName : 'li',
        model : MovementManeuverModel,
        template: MovementManeuverListItemTemplate
    });

    return MovementManeuverListItemView;

});
