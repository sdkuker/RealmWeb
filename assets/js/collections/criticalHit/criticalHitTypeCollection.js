define(['backbone', 'firebase', 'backfire', 'models/criticalHit/criticalHitTypeModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CriticalHitTypeModel, ServiceConstants) {

        var CriticalHitTypeCollection = Backbone.Firebase.Collection.extend({
            model: CriticalHitTypeModel,
            url: ServiceConstants.backFireBaseURL + '/criticalHitTypes',
            comparator: function(criticalHitType) {
                return criticalHitType.id;
            },
            getAllTypes : function() {

                return this.models;
            }
        });

        return CriticalHitTypeCollection;

    });
