define(['backbone', 'firebase', 'backfire', 'models/combat/characterCombatRoundStatisticModel', 'services/serviceConstants', 'config'],
    function (Backbone, Firebase, Backfire, CharacterCombatRoundStatisticModel, ServiceConstants, Config) {

        var CharacterCombatRoundStatisticCollection = Backbone.Firebase.Collection.extend({
            model: CharacterCombatRoundStatisticModel,
            myEncounterID : null,
            myRoundID : null,
            myEncounterRoundID : null,
            autoSync : true,
            sortKey : 'initiative',
            reverseSort : -1,
            initialize: function(models, options) {
                // return all the rounds if no encounter id was specified
                // you cannot  add round to a collection generated with an orderByChild or equalTo clause
                if (options) {
                    if (options.encounterID) {
                        this.myEncounterID = encodeURI(options.encounterID);
                    }
                    if (options.roundID) {
                        this.myRoundID = encodeURI(options.roundID);
                    }
                    if (this.myEncounterID && this.myRoundID) {
                        this.myEncounterRoundID = this.formatEncounterRoundID(this.myEncounterID, this.myRoundID);
                    }
                    if (options.disableAutoSync) {
                        this.autoSync = false;
                    }
                };
            },
            formatEncounterRoundID: function(encounterID, roundID) {
                return encodeURI(encounterID) + '-' + roundID;
            },
            url: function() {
                if (this.myEncounterRoundID) {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment +
                        '/combatRoundStatistics').orderByChild('encounterRoundID').equalTo(this.myEncounterRoundID);
                } else {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment +
                        '/combatRoundStatistics');
                }
            },
            sortByInitiative: function() {
                this.sortKey = 'initiative';
                this.reverseSort = -1;
                this.sort();
            },
            sortByCharacterName: function() {
                this.sortKey = 'characterName';
                this.reverseSort = +1;
                this.sort();
            },
            comparator: function(statistics1, statistics2) {
                statisticsOneSortKey = statistics1.get(this.sortKey);
                statisticsTwoSortKey = statistics2.get(this.sortKey);
                if (this.sortKey === 'characterName') {
                    statisticsOneSortKey = decodeURI(statisticsOneSortKey);
                    statisticsOneSortKey = statisticsOneSortKey.trim();
                    statisticsOneSortKey = statisticsOneSortKey.toLowerCase();
                    statisticsTwoSortKey = decodeURI(statisticsTwoSortKey);
                    statisticsTwoSortKey = statisticsTwoSortKey.trim();
                    statisticsTwoSortKey = statisticsTwoSortKey.toLowerCase();
                }
                let initialReturnValue  = statisticsOneSortKey > statisticsTwoSortKey ? 1
                                        : statisticsOneSortKey < statisticsTwoSortKey ? -1
                                        : 0;
                return initialReturnValue * this.reverseSort;
            },
            hasAnyStatistics : function() {
                var self = this;
                return self.length > 0;
            },
            forPlayer : function(PlayerModel) {
                var playersRounds = this.filter(function (aStatistic) {
                    return aStatistic.get('playerID') === PlayerModel.get('id');
                })
                var newCollection =  new CharacterCombatRoundStatisticCollection(playersRounds,
                    {roundID : this.get('id'), encounterID : this.get('encounterID'), disableAutoSync : true});
                return newCollection;
            }
        });

        return CharacterCombatRoundStatisticCollection;

    });
