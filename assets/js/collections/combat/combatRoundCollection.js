define(['backbone', 'firebase', 'backfire', 'models/combat/combatRoundModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CombatRoundModel, ServiceConstants) {

        var CombatRoundCollection = Backbone.Firebase.Collection.extend({
            model: CombatRoundModel,
            myEncounterID : null,
            initialize: function(models, options) {
                this.myEncounterID = encodeURI(options.encounterID);
            },
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/combatRounds').orderByChild('encounterID').equalTo(this.myEncounterID);
            },
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatRound) {
                return combatRound.get('roundNumber');
            }
        });

        return CombatRoundCollection;

    });
