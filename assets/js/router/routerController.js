define(['realmApplication',
        'views/workInProgressView',
        'views/dieRoller/dieRollerView',
        'models/dieRoller/dieModel',
        'views/combat/combatEncounterList',
        '../views/player/playerListView'
    ],
    function (RealmApplication,  WorkInProgressView, DieRollerView, DieModel, CombatEncounterListView,
              PlayerListView) {

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
                var view = new PlayerListView();
                RealmApplication.regions.mainRegion.show(view);
            }
        };

        return RouterController;

    });
