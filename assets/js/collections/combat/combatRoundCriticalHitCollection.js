define(['backbone', 'firebase', 'backfire', 'models/combat/combatRoundCriticalHitModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CombatRoundCriticalHitModel, ServiceConstants) {

        var CombatRoundCriticalHitCollection = Backbone.Firebase.Collection.extend({
            model: CombatRoundCriticalHitModel,
            myRoundID : null,
            initialize: function(models, options) {
                // options are: combatRoundID,
                // If no options are passed, all combatRoundCriticalHits will be returned.
                // If a combatRoundID is passed, alll the combatRoundCriticalHits for all
                //  characters in the round will be returned.
                if (options) {
                    if (options.combatRoundID) {
                        this.myRoundID = encodeURI(options.combatRoundID)
                    }
                }
            },
            url: function() {
                if (this.myEncounterID) {
                    return new Firebase(ServiceConstants.backFireBaseURL +
                        '/combatRoundCriticalHits').orderByChild('combatRoundID').equalTo(this.myRoundID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/combatRoundCriticalHits');
                }

            },
            comparator: function(combatRoundCriticalHit) {
                return combatRoundCriticalHit.get('combatRoundID') + '-' + combatRoundCriticalHit.get('characterID') +
                    '-' + combatRoundCriticalHit.get('criticalHitID');
            }
        });

        return CombatRoundCriticalHitCollection;

    });
