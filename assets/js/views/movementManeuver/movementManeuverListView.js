define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/movementManeuver/movementManeuverDisplayModel',
    'tpl!templates/movementManeuver/movementManeuverListTemplate.tpl',
    'views/movementManeuver/movementManeuverListItemView'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, MovementManeuverDisplayModel, 
        MovementManeuverListTemplate, MovementManeuverItemView) {
        var MovementManeuverListView = Marionette.CompositeView.extend({
            tagName: 'ul',
            id: 'movementManeuverList',
            className: 'list-group',
            template: MovementManeuverListTemplate,
            childView: MovementManeuverItemView,
            childViewContainer: 'ul',
            numberOfManeuversToDisplay: 10,
            initialize: function () {
                var self = this;
                this.listenTo(RealmApplication.vent, 'movementManeuverFilter:movementManeuverSelected', function (selectedMovementManeuverData) {
                    self.displayMovementManeuver(selectedMovementManeuverData);
                });
            },
            displayMovementManeuver: function (aMovementManeuverData) {
                if (aMovementManeuverData) {
                    var displayString = 'Difficulty: ' + aMovementManeuverData.difficulty;
                    displayString = displayString.concat(' - Roll: ' + aMovementManeuverData.rollValue);
                    displayString = displayString.concat(' - Result: ' + aMovementManeuverData.model.getResult());
                    var myDisplayModel = new MovementManeuverDisplayModel();
                    myDisplayModel.set('description', displayString);
                    this.collection.add(myDisplayModel, { at: 0 });
                    if (this.collection.length > this.numberOfManeuversToDisplay) {
                        this.collection.pop();
                    }
                }
            }
        });

        return MovementManeuverListView;

    });
