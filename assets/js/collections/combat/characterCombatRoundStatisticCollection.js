define(['backbone', 'firebase', 'backfire', 'models/combat/characterCombatRoundStatisticModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, CharacterCombatRoundStatisticModel, ServiceConstants, Config) {

        var CharacterCombatRoundStatisticCollection = Backbone.Firebase.Collection.extend({
            model: CharacterCombatRoundStatisticModel,
            myEncounterID : null,
            myRoundID : null,
            myEncounterRoundID : null,
            initialize: function(models, options) {
                // return all the rounds if no encounter id was specified
                // you cannot  add round to a collection generated with a query
                if (options) {
                    this.myEncounterID = encodeURI(options.encounterID);
                    this.myRoundID = encodeURI(options.roundID);
                    this.myEncounterRoundID = this.formatEncounterRoundID(this.myEncounterID, this.myRoundID);
                };
            },
            formatEncounterRoundID: function(encounterID, roundID) {
                return encodeURI(encounterID) + '-' + roundID;
            },
            url: function() {
                if (this.myEncounterRoundID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/combatRoundStatistics').orderByChild('encounterRoundID').equalTo(this.myEncounterRoundID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/combatRoundStatistics');
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
