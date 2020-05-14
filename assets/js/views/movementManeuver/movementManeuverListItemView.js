define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuver/movementManeuverListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverModel'], function (Marionette, RealmApplication, MovementManeuverListItemTemplate, MovementManeuverModel) {
    var MovementManeuverListItemView = Marionette.ItemView.extend({
        tagName : 'li',
        model : MovementManeuverModel,
        template: MovementManeuverListItemTemplate,
        templateHelpers : function() {
            var myResult = this.model.getResult();
            return {
                myResult : myResult
            }
        },
    });

    return MovementManeuverListItemView;

});
