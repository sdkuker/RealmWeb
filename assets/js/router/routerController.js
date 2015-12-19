define(['realmApplication',
        'views/workInProgressView',
        'views/dieRoller/dieRollerView',
        'models/dieRoller/dieModel',
        'views/combat/combatEncounterList',
        'views/player/playerListView',
        'views/player/playerView',
        'models/player/playerModel',
        'collections/player/playerCollection',
        'services/playerServices'
    ],
    function (RealmApplication,  WorkInProgressView, DieRollerView, DieModel, CombatEncounterListView,
              PlayerListView, PlayerView, PlayerModel, PlayerCollection, PlayerServices) {

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
                var aPlayerModel = new PlayerModel();
                var playerCollection = PlayerServices.getAllPlayers();
                var view = new PlayerListView({collection: playerCollection});
                RealmApplication.regions.mainRegion.show(view);
            }
        };

        return RouterController;

    });
