define(['backbone', 'firebase', 'backfire', 'models/combat/combatRoundModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, CombatRoundModel, ServiceConstants, Config) {

        var CombatRoundCollection = Backbone.Firebase.Collection.extend({
            model: CombatRoundModel,
            myEncounterID : null,
            initialize: function(models, options) {
                // return all the rounds if no encounter id was specified
                // you cannot  a round to a collection generated with a query
                if (options) {
                    this.myEncounterID = encodeURI(options.encounterID);
                };
            },
            url: function() {
                if (this.myEncounterID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment  + '/combatRounds').orderByChild('encounterID').equalTo(this.myEncounterID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment  + '/combatRounds');
                }
                
            },
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatRound) {
                return combatRound.get('encounterID') + '-' + combatRound.get('roundNumber');
            }
        });

        return CombatRoundCollection;

    });
