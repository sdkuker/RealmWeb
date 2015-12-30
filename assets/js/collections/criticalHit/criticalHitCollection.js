define(['backbone', 'models/criticalHit/criticalHitModel'],
    function (Backbone, CriticalHitModel) {

        var PlayerListCollection = Backbone.Collection.extend({
            _parse_class_name : 'CriticalHit',
            model: CriticalHitModel,
            comparator: function(criticalHit) {
                return criticalHit.getType() + ':' +
                        criticalHit.getSeverity() + ':' +
                        criticalHit.getRollMinimumValue();
            }
        });

        return PlayerListCollection;

    });
