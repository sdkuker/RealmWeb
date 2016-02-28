define(['backbone', 'models/criticalHit/criticalHitModel'],
    function (Backbone, CriticalHitModel) {

        var CriticalHitDisplayCollection = Backbone.Collection.extend({
            model: CriticalHitModel,
            comparator: function(criticalHit) {
                return criticalHit.getType() + ':' +
                    criticalHit.getSeverity() + ':' +
                    criticalHit.getRollMinimumValue();
            }
        });

        return CriticalHitDisplayCollection;

    });
