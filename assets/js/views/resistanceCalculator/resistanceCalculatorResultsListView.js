define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/resistanceCalculator/resistanceCalculatorResultsListTemplate.tpl",
    'views/resistanceCalculator/resistanceCalculatorResultsListItemView'],
    function (Marionette, RealmApplication, Logger, ViewUtilities, ResistanceCalculatorResultListTemplate, ResistanceCalculatorResultItemView) {
    var ResistanceCalculatorResultListView = Marionette.CompositeView.extend({
        tagName : 'ul',
        id : 'resistanceCalculatorResultList',
        className : 'list-group',
        template: ResistanceCalculatorResultListTemplate,
        childView : ResistanceCalculatorResultItemView,
        childViewContainer : 'ul',
        selectedModel : '',
        currentSequence : 0,
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'resistanceCalculatorView:resistanceCalculationComputed', function(aResistanceCalculatorResultModel) {
                self.currentSequence ++;
                aResistanceCalculatorResultModel.setRollSequence(self.currentSequence);
                self.collection.add(aResistanceCalculatorResultModel);
                if (self.collection.length > 10) {
                    self.collection.pop();
                }
            });
        }
    });

    return ResistanceCalculatorResultListView;

});
