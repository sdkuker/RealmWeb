define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/criticalHit/criticalHitListTemplate.tpl",
    'views/criticalHit/criticalHitListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, CriticalHitListTemplate, CriticalHitItemView) {
    var CriticalHitListView = Marionette.CompositeView.extend({
        tagName : 'ul',
        id : 'criticalHitList',
        className : 'list-group',
        template: CriticalHitListTemplate,
        childView : CriticalHitItemView,
        childViewContainer : 'ul',
        selectedModel : '',
        numberOfHitsToDisplay : 10,
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'criticalHitFilter:criticalHitSelected', function(selectedCriticalHitModel) {
                self.displayCriticalHit(selectedCriticalHitModel);
            });
        },
        displayCriticalHit : function(aCriticalHitModel) {
            var criticalHitWithoutID = aCriticalHitModel.toJSON();
            delete criticalHitWithoutID.objectId;
            this.collection.add(criticalHitWithoutID, {at: 0});
            if (this.collection.length > this.numberOfHitsToDisplay) {
                this.collection.pop();
            }
        }
    });

    return CriticalHitListView;

});
