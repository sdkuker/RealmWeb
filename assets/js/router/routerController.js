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
                    var myPlayerCollection = PlayerWarehouse.getAllPlayers();
                    var playerListView = new PlayerListView({collection: myPlayerCollection});
                    var playerListButtonView = new PlayerListButtonView();
                    playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                    playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
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
                    'collections/criticalHit/criticalHitTypeCollection', 'views/criticalHit/criticalHitListView'],
                function (CriticalHitLayoutView, CriticalHitFilterView, CriticalHitWarehouse, CriticalHitCollection,
                          CriticalHitTypeCollection, CriticalHitListView) {
                    var criticalHitLayoutView = new CriticalHitLayoutView();
                    RealmApplication.regions.mainRegion.show(criticalHitLayoutView);
                    $.when(CriticalHitWarehouse.getAllTypes()).then(
                        function(criticalHitTypeCollection) {
                            $.when(CriticalHitWarehouse.getCriticalHitsForType(criticalHitTypeCollection.at(0).get('type'))).then (
                                function(criticalHitCollection) {
                                    var critialHitFilterView = new CriticalHitFilterView({criticalHitTypes : criticalHitTypeCollection, criticalHits: criticalHitCollection});
                                    criticalHitLayoutView.getRegion('criticalHitFilterRegion').show(critialHitFilterView);
                                    var displayedHitsCollection = new CriticalHitCollection();
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

    };

        return RouterController;

    });
