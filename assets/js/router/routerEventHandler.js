define(['realmApplication', 'router/router', 'router/routerController'
    ],
    function (RealmApplication, Router, RouterController) {

        RealmApplication.vent.bind('playerListAddPlayer', function (model) {
            Router.navigate('viewPlayer');
            RouterController.viewPlayer(model);
        });

        RealmApplication.vent.bind('playerListChangeButton:clicked', function (model) {
            Router.navigate('viewPlayer');
            RouterController.viewPlayer(model);
        });

        RealmApplication.vent.bind('playerListDeleteButton:clicked', function (model) {
           // Router.navigate('viewPlayer');
           // RouterController.viewPlayer(model);
        });
        RealmApplication.vent.bind('viewPlayerList', function () {
            Router.navigate('playerList');
            RouterController.playerList();
        });

        RealmApplication.vent.bind('characterListAddCharacter', function (model) {
            Router.navigate('viewCharacter');
            RouterController.viewCharacter(model);
        });

        RealmApplication.vent.bind('characterListChangeCharacter', function (model) {
            Router.navigate('viewCharacter');
            RouterController.viewCharacter(model);
        });

        RealmApplication.vent.bind('characterListDeleteButton:clicked', function (model) {
            // Router.navigate('viewPlayer');
            // RouterController.viewPlayer(model);
        });
        RealmApplication.vent.bind('viewCharacterList', function () {
            Router.navigate('characterList');
            RouterController.characterList();
        });

        //  combat encounters
        RealmApplication.vent.bind('combatEncounterListAddCombatEncounter', function (model) {
            Router.navigate('addChangeCombatEncounter');
            RouterController.addChangeCombatEncounter(model);
        });

        RealmApplication.vent.bind('combatEncounterListChangeCombatEncounter', function (model) {
            Router.navigate('addChangeCombatEncounter');
            RouterController.addChangeCombatEncounter(model);
        });

        RealmApplication.vent.bind('combatEncounterListDeleteButton:clicked', function (model) {
            // Router.navigate('viewCombatEncounter');
            // RouterController.viewCombatEncounter(model);
        });
        RealmApplication.vent.bind('viewCombatEncounterList', function () {
            Router.navigate('viewCombatEncounterList');
            RouterController.combatEncounterList();
        });
        RealmApplication.vent.bind('combatEncounterListOpenCombatEncounter', function (model) {
            Router.navigate('openCombatEncounter');
            RouterController.openCombatEncounter(model);
        });
    });
