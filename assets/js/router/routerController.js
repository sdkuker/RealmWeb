define(['realmApplication'
    ],
    function (RealmApplication) {

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
                require(['views/player/playerListView', 'views/player/playerView', 'collections/player/playerCollection',
                    'services/playerServices','views/player/playerListLayoutView','views/player/playerListButtonView'],
                    function (PlayerListView, PlayerView, PlayerCollection, PlayerServices, PlayerListLayoutView,
                              PlayerListButtonView) {
                    var playerListLayoutView = new PlayerListLayoutView();
                    RealmApplication.regions.mainRegion.show(playerListLayoutView);
                    var playerCollection = PlayerServices.getAllPlayers();
                    var playerListView = new PlayerListView({collection: playerCollection});
                    var playerListButtonView = new PlayerListButtonView();
                    playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                    playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
                });
            }
        };

        return RouterController;

    });
