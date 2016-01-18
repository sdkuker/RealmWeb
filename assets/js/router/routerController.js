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
                    'services/playerServices','views/player/playerListLayoutView','views/player/playerListButtonView'],
                    function (PlayerListView, PlayerView, PlayerServices, PlayerListLayoutView,
                              PlayerListButtonView) {
                    var playerListLayoutView = new PlayerListLayoutView();
                    RealmApplication.regions.mainRegion.show(playerListLayoutView);
                        $.when(PlayerServices.getAllPlayers()).then(
                            function(playerCollection) {
                                var playerListView = new PlayerListView({collection: playerCollection});
                                var playerListButtonView = new PlayerListButtonView();
                                playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                                playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
                            },
                            function(errorString) {
                                console.log(errorString);
                            }
                        )
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
                            var critialHitFilterView = new CriticalHitFilterView({criticalHitTypes : criticalHitTypeCollection});
                            criticalHitLayoutView.getRegion('criticalHitFilterRegion').show(critialHitFilterView);
                            var displayedHitsCollection = new CriticalHitCollection();
                            var criticalHitListView = new CriticalHitListView({collection : displayedHitsCollection});
                            criticalHitLayoutView.getRegion('criticalHitDisplayRegion').show(criticalHitListView);
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
