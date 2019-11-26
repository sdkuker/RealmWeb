define(['marionette',
    'realmApplication',
    "tpl!templates/resistanceCalculator/resistanceCalculatorResultListItemTemplate.tpl",
    'models/resistanceCalculator/resistanceCalculatorResultModel'],
    function (Marionette, RealmApplication, ResistanceCalculatorResultListItemTemplate, ResistanceCalculatorResultModel) {
    var ResistanceCalculatorResultListItemView = Marionette.ItemView.extend({
        tagName: 'li',
        model: ResistanceCalculatorResultModel,
        template: ResistanceCalculatorResultListItemTemplate,
    });

    return ResistanceCalculatorResultListItemView;

});
