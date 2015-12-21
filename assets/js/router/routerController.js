define(['realmApplication',
        'views/workInProgressView',
        'views/dieRoller/dieRollerView',
        'models/dieRoller/dieModel',
        'views/combat/combatEncounterList',
        'views/player/playerListView',
        'views/player/playerView',
        'models/player/playerModel',
        'collections/player/playerCollection',
        'services/playerServices',
        'views/player/playerListLayoutView',
        'views/player/playerListButtonView'
    ],
    function (RealmApplication,  WorkInProgressView, DieRollerView, DieModel, CombatEncounterListView,
              PlayerListView, PlayerView, PlayerModel, PlayerCollection, PlayerServices, PlayerListLayoutView,
              PlayerListButtonView) {

        RouterController = {
            workInProgress: function () {
                var view = new WorkInProgressView();
                RealmApplication.regions.mainRegion.show(view);
            },
            dieRoller: function () {
                var dieModel = new DieModel();
                var view = new DieRollerView({model: dieModel});
                RealmApplication.regions.mainRegion.show(view);
            },
            combatEncounterList: function () {
                var view = new CombatEncounterListView();
                RealmApplication.regions.mainRegion.show(view);
            },
            playerList: function () {
                var playerListLayoutView = new PlayerListLayoutView();
                RealmApplication.regions.mainRegion.show(playerListLayoutView);
                var playerCollection = PlayerServices.getAllPlayers();
                var playerListView = new PlayerListView({collection: playerCollection});
                var playerListButtonView = new PlayerListButtonView();
                playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
            }
        };

        return RouterController;

    });
