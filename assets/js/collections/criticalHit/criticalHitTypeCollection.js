define(['backbone', 'models/criticalHit/criticalHitTypeModel'],
    function (Backbone, CriticalHitTypeModel) {

        var CriticalHitTypeCollection = Backbone.Collection.extend({
            _parse_class_name : 'CriticalHitType',
            model: CriticalHitTypeModel,
            comparator: function(criticalHitType) {
                return criticalHitType.getType();
            },
            getAllTypes : function() {

                return this.models;
            }
        });

        return CriticalHitTypeCollection;

    });
