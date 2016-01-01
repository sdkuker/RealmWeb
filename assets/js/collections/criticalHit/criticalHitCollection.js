define(['backbone', 'models/criticalHit/criticalHitModel'],
    function (Backbone, CriticalHitModel) {

        var PlayerListCollection = Backbone.Collection.extend({
            _parse_class_name : 'CriticalHit',
            model: CriticalHitModel,
            comparator: function(criticalHit) {
                return criticalHit.getType() + ':' +
                        criticalHit.getSeverity() + ':' +
                        criticalHit.getRollMinimumValue();
            },
            getAllTypes : function() {
                var groupBySet = this.groupBy(function(criticalHitModel) {
                    return criticalHitModel.get('type');
                });
                return groupBySet;
            },
            getAllSeverities : function() {
                var groupBySet = this.groupBy(function(criticalHitModel) {
                    return criticalHitModel.get('severity');
                });
                return groupBySet;
            },
        });

        return PlayerListCollection;

    });
