define(['backbone', 'firebase', 'backfire', 'models/character/characterModel',
        'services/serviceConstants', 'config', 'services/playerWarehouse'],
    function (Backbone, Firebase, Backfire, CharacterModel, ServiceConstants, Config, PlayerWarehouse) {

        var CharacterCollection = Backbone.Firebase.Collection.extend({
            mode : null,
            sortKey : 'initiative',
            reverseSort : -1,
            initialize : function(options) {
                if (options && options.mode)
                {
                    this.mode = options.mode;
                }
            },
            url: function() {
                if (this.mode && this.mode == "all") {
                    return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/characters/');
                } else {
                    if (PlayerWarehouse && PlayerWarehouse.getPlayerLoggedIn() && PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                        return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/characters/');
                    } else {
                        return new Firebase(ServiceConstants.backFireBaseURL + '/'  + Config.environment + '/characters/')
                            .orderByChild("playerID").equalTo(PlayerWarehouse.getPlayerLoggedIn().get('id'));
                    }
                }


            },
            model: CharacterModel,
            sortByInitiative: function() {
                this.sortKey = 'initiative';
                this.sort();
            },
            sortByPlayer: function() {
                this.sortKey = 'playerID';
                this.sort();
            },
            comparator: function(character1, character2) {
                characterOneSortKey = character1.get(this.sortKey);
                characterTwoSortKey = character2.get(this.sortKey);
                if ('playerId' === this.sortKey) {
                    characterOneSortKey += character1.get('initiative');
                    characterTwoSortKey += character2.get('initiative');
                }
                let initialReturnValue  = characterOneSortKey > characterTwoSortKey ? 1
                                        : characterOneSortKey < characterTwoSortKey ? -1
                                        : 0;
                return initialReturnValue * this.reverseSort;
            },
            parse : function(response, options) {
                console.log("i'm here too.");
            }
        });

        return CharacterCollection;

    });
