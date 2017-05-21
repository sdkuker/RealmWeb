define(['backbone', 'firebase', 'backfire', 'models/criticalHit/criticalHitModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CriticalHitModel, ServiceConstants) {

        var CriticalHitCollection = Backbone.Firebase.Collection.extend({
            myType : null,
            initialize: function(models, options) {
                this.myType = encodeURI(options.type);
            },
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/criticalHits/' + this.myType).orderByChild('severity');
            },
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
            getSeveritiesForType : function(aType) {
                var groupBySet = this.groupBy(function(criticalHitModel) {
                    if (criticalHitModel.get('type') == aType) {
                        return criticalHitModel.get('severity');
                    } else {
                        return 'notSelectedType';
                    }
                });
                return groupBySet;
            },
            getCriticalHit : function(rollValue, type, severity) {
                var selectedModel = this.filter(function(criticalHitModel) {
                    var isItAMatch =  criticalHitModel.get('type') === type &&
                            criticalHitModel.get('severity') === severity &&
                            criticalHitModel.get('rollMinimumValue') <= rollValue &&
                            criticalHitModel.get('rollMaximumValue') >= rollValue;
                    return isItAMatch;
                });
                return selectedModel;
            },
            getCriticalHitList : function( type, severity) {
                var selectedModel = this.filter(function(criticalHitModel) {
                    var isItAMatch =  criticalHitModel.get('type') === type &&
                        criticalHitModel.get('severity') === severity;
                    return isItAMatch;
                });
                return selectedModel;
            }
        });

        return CriticalHitCollection;

    });
