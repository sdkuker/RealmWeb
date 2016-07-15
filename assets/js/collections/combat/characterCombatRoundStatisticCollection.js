define(['backbone', 'firebase', 'backfire', 'models/combat/characterCombatRoundStatisticModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CharacterCombatRoundStatisticModel, ServiceConstants) {

        var CharacterCombatRoundStatisticCollection = Backbone.Firebase.Collection.extend({
            model: CharacterCombatRoundStatisticModel,
            myEncounterID : null,
            myRoundID : null,
            myEncounterRoundID : null,
            initialize: function(models, options) {
                // return all the rounds if no encounter id was specified
                // you cannot  a round to a collection generated with a query
                if (options) {
                    this.myEncounterID = encodeURI(options.encounterID);
                    this.myRoundID = encodeURI(options.roundID);
                    this.myEncounterRoundID = this.myEncounterID + '-' + this.myRoundID;
                };
            },
            url: function() {
                if (this.myEncounterRoundID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/combatRoundStatistics').orderByChild('encounterRoundID').equalTo(this.encounterRoundID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/combatRoundStatistics');
                }
            },
            comparator: function(combatRoundStatistic) {
                return combatRoundStatistic.get('characterID');
            },
            hasAnyStatistics : function() {
                var self = this;
                return self.length > 0;
            }
        });

        return CharacterCombatRoundStatisticCollection;

    });
