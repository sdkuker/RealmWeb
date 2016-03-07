define(['jquery', 'realmApplication'
    ],
    function ($, RealmApplication) {

        RouterController = {
            workInProgress: function () {
                require(['views/workInProgressView'], function (WorkInProgressView) {
                    var view = new WorkInProgressView();
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            dieRoller: function () {
                require(['models/dieRoller/dieModel','views/dieRoller/dieRollerView'], function (DieModel, DieRollerView) {
                    var dieModel = new DieModel();
                    var view = new DieRollerView({model: dieModel});
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            combatEncounterList: function () {
                require(['views/combat/combatEncounterList',], function (CombatEncounterListView) {
                    var view = new CombatEncounterListView();
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            playerList: function () {
                require(['views/player/playerListView', 'views/player/playerView',
                    'views/player/playerListLayoutView','views/player/playerListButtonView',
                    'services/playerWarehouse'],
                    function (PlayerListView, PlayerView, PlayerListLayoutView,
                              PlayerListButtonView, PlayerWarehouse) {
                    var playerListLayoutView = new PlayerListLayoutView();
                    RealmApplication.regions.mainRegion.show(playerListLayoutView);
                    $.when(PlayerWarehouse.getAllPlayers()).then(
                        function(myPlayerCollection) {
                            var playerListView = new PlayerListView({collection: myPlayerCollection});
                            var playerListButtonView = new PlayerListButtonView();
                            playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                            playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
                        }
                    ),
                        function() {
                            console.log('some kind of error getting players');
                        }
                });
            },
            viewPlayer: function(playerModel) {
                require(['views/player/playerView'], function (PlayerView) {
                    var playerView = new PlayerView({model : playerModel});
                    RealmApplication.regions.mainRegion.show(playerView);
                });
            },
            criticalHits: function () {
                require(['views/criticalHit/criticalHitLayoutView', 'views/criticalHit/criticalHitFilterView',
                         'services/criticalHitWarehouse', 'collections/criticalHit/criticalHitCollection',
                        'collections/criticalHit/criticalHitDisplayCollection', 'collections/criticalHit/criticalHitTypeCollection',
                        'views/criticalHit/criticalHitListView', 'services/serviceConstants'],
                    function (CriticalHitLayoutView, CriticalHitFilterView, CriticalHitWarehouse, CriticalHitCollection,
                              CriticalHitDisplayCollection, CriticalHitTypeCollection, CriticalHitListView, ServiceConstants) {
                        var criticalHitLayoutView = new CriticalHitLayoutView();
                        RealmApplication.regions.mainRegion.show(criticalHitLayoutView);
                        var tempThang = ServiceConstants.backFireBaseURL + '/criticalHits/Acid';
                        $.when(CriticalHitWarehouse.getAllTypes()).then(
                            function(criticalHitTypeCollection) {
                                $.when(CriticalHitWarehouse.getCriticalHitsForType(criticalHitTypeCollection.at(0).get('id'))).then (
                                    function(criticalHitCollection) {
                                        var critialHitFilterView = new CriticalHitFilterView({criticalHitTypes : criticalHitTypeCollection, criticalHits: criticalHitCollection});
                                        criticalHitLayoutView.getRegion('criticalHitFilterRegion').show(critialHitFilterView);
                                        var displayedHitsCollection = new CriticalHitDisplayCollection();
                                        var criticalHitListView = new CriticalHitListView({collection : displayedHitsCollection});
                                        criticalHitLayoutView.getRegion('criticalHitDisplayRegion').show(criticalHitListView);
                                    },
                                    function(errorString) {
                                        console.log(errorString);
                                    }
                                )
                            },
                            function(errorString) {
                                console.log(errorString);
                            }
                        )
                    });
            },
            characterList: function () {
                require(['views/character/characterListView', 'views/character/characterView',
                        'views/character/characterListLayoutView','views/character/characterListButtonView',
                        'services/characterWarehouse'],
                    function (CharacterListView, CharacterView, CharacterListLayoutView,
                              CharacterListButtonView, CharacterrWarehouse) {
                        var characterListLayoutView = new CharacterListLayoutView();
                        RealmApplication.regions.mainRegion.show(characterListLayoutView);
                        $.when(CharacterrWarehouse.getAllCharacters()).then(
                            function(myCharacterCollection) {
                                var characterListView = new CharacterListView({collection: myCharacterCollection});
                                var characterListButtonView = new CharacterListButtonView();
                                characterListLayoutView.getRegion('characterTableRegion').show(characterListView);
                                characterListLayoutView.getRegion('buttonsRegion').show(characterListButtonView);
                            }
                        ),
                            function() {
                                console.log('some kind of error getting characters');
                            }
                    });
            }
        };

        return RouterController;

    });
