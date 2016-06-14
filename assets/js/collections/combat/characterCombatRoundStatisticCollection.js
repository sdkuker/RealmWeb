define(['backbone', 'firebase', 'backfire', 'models/combat/characterCombatRoundStatisticModel', 'services/serviceConstants'],
    function (Backbone, Firebase, Backfire, CharacterCombatRoundStatisticModel, ServiceConstants) {

        var CharacterCombatRoundStatisticCollection = Backbone.Firebase.Collection.extend({
            model: CharacterCombatRoundStatisticModel,
            myEncounterID : null,
            myRoundID : null,
            myEncounterRoundID : null,
            initialize: function(models, options) {
                this.myEncounterID = encodeURI(options.encounterID);
                this.myRoundID = encodeURI(options.roundID);
                this.myEncounterRoundID = this.myEncounterID + '-' + this.myRoundID;
            },
            url: function() {
                return new Firebase(ServiceConstants.backFireBaseURL + '/combatRoundStatistics').orderByChild('encounterRoundID').equalTo(this.encounterRoundID);
            },
            comparator: function(combatRoundStatistic) {
                return combatRoundStatistic.get('characterID');
            }
        });

        return CharacterCombatRoundStatisticCollection;

    });
