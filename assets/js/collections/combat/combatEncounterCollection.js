define(['backbone', 'firebase', 'backfire', 'models/combat/combatEncounterModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, CombatEncounterModel, ServiceConstants, Config) {

        var CombatEncounterCollection = Backbone.Firebase.Collection.extend({
            model: CombatEncounterModel,
            url: ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/combatEncounters',
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatEncounter) {
                return combatEncounter.getDescription();
            }
        });

        return CombatEncounterCollection;

    });
