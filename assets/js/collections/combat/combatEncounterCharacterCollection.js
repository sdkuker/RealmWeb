define(['backbone', 'firebase', 'backfire', 'models/combat/combatEncounterCharacterModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, CombatEncounterCharacterModel, ServiceConstants, Config) {

        var CombatEncounterCharacterCollection = Backbone.Firebase.Collection.extend({
            model: CombatEncounterCharacterModel,
            myEncounterID : null,
            initialize: function(models, options) {
                // return all the characters if no encounter id was specified
                // you cannot  add a character to a collection generated with an orderByChild clause
                if (options) {
                    this.myEncounterID = encodeURI(options.encounterID);
                };
            },
            url: function() {
                if (this.myEncounterID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment  + '/combatEncounterCharacters').orderByChild('encounterID').equalTo(this.myEncounterID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment  + '/combatEncounterCharacters');
                }
                
            },
            getAll: function() {
                return this.getDescription();
            },
            comparator: function(combatRound) {
                return combatRound.get('encounterID') + '-' + combatRound.get('characterID');
            }
        });

        return CombatEncounterCharacterCollection;

    });
