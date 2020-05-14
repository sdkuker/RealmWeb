define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/movementManeuver/movementManeuverListTemplate.tpl",
    'views/movementManeuver/movementManeuverListItemView'], 
    function (Marionette, RealmApplication, Logger, ViewUtilities, MovementManeuverListTemplate, MovementManeuverItemView) {
    var MovementManeuverListView = Marionette.CompositeView.extend({
        tagName : 'ul',
        id : 'movementManeuverList',
        className : 'list-group',
        template: MovementManeuverListTemplate,
        childView : MovementManeuverItemView,
        childViewContainer : 'ul',
        selectedModel : '',
        numberOfManeuversToDisplay : 10,
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'movementManeuverFilter:movementManeuverSelected', function(selectedMovementManeuverData) {
                self.displayMovementManeuver(selectedMovementManeuverData);
            });
        },
        displayMovementManeuver : function(aMovementManeuverData) {
            if (aMovementManeuverData) {
                this.collection.add(aMovementManeuverData.model, {at: 0});
                if (this.collection.length > this.numberOfManeuversToDisplay) {
                    this.collection.pop();
                }
            }
        }
    });

    return MovementManeuverListView;

});
