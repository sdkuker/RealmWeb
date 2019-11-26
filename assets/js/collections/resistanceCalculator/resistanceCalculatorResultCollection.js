define(['backbone', 'models/resistanceCalculator/resistanceCalculatorResultModel'],
    function (Backbone, ResistanceCalculatorResultModel) {

        var ResistanceCalculatorResultCollection = Backbone.Collection.extend({

            model: ResistanceCalculatorResultModel,

            comparator: function(result) {
                return  - result.getRollSequence();
            }
        });

        return ResistanceCalculatorResultCollection;

    });
