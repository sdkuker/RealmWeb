define(['backbone', 'firebase', 'backfire', 'models/combat/combatRountModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CombatRoundModel, ServiceConstants) {

        var CombatRoundCollection = Backbone.Firebase.Collection.extend({
            model: CombatRoundModel,
            myEncounterID : null,
            initialize: function(models, options) {
                this.myEncounterID = encodeURI(options.encounterID);
            },
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/combatRounds').orderByChild('encounterID').equalTo(myEncounterID);
            },
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatRound) {
                return combatRound.getDescription();
            }
        });

        return CombatRoundCollection;

    });
