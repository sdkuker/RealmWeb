define(['backbone', 'firebase', 'backfire', 'models/combat/combatEncounterModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CombatEncounterModel, ServiceConstants) {

        var CombatEncounterCollection = Backbone.Firebase.Collection.extend({
            model: CombatEncounterModel,
            url: ServiceConstants.backFireBaseURL + '/combatEncounters',
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatEncounter) {
                return combatEncounter.getDescription();
            }
        });

        return CombatEncounterCollection;

    });
