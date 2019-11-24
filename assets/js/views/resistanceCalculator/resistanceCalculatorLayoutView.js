define(['marionette',
        "tpl!templates/resistanceCalculator/resistanceCalculatorLayoutTemplate.tpl"],
    function (Marionette, CriticalHitLayoutTemplate) {

        var ResistanceCalculatorLayoutView = Marionette.LayoutView.extend({
            template: CriticalHitLayoutTemplate,
            regions : {
                resistanceCalculatorRegion : '#resistanceCalculatorRegion',
                resistanceResultsRegion : '#resistanceResultsRegion'
            }
        });

        return ResistanceCalculatorLayoutView;

    });
