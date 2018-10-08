define(['realmApplication', 'router/router', 'router/routerController', 'utility/viewUtilities'
    ],
    function (RealmApplication, Router, RouterController, ViewUtilities) {

        RealmApplication.vent.bind('authenticationSignedInView:userSignedOutSuccessfully', function() {
            RouterController.hideSigninRegionAndDisplaySignedOutView();

        });
            RealmApplication.vent.bind('userIsSignedIn', function (playerModel) {
            RouterController.displayLoggedInUser(playerModel);
            Router.navigate('dieRoller');
            RouterController.dieRoller();
            ViewUtilities.currentNavSelection = 'dieRoller';
            ViewUtilities.resetActiveNavSelection();
        });
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
        RealmApplication.vent.bind('combatCriticalHitsForEncounterDefender', function (anEncounterID, aCharacterID) {
            var navString = 'criticalHits/' + anEncounterID;
            if (aCharacterID) {
                navString = navString + '/' + aCharacterID;
            }
            Router.navigate(navString);
            RouterController.criticalHits(anEncounterID, aCharacterID);
        });
        RealmApplication.vent.bind('userSignedOut', function () {
            Router.navigate('dieRoller');
            RouterController.dieRoller();
            ViewUtilities.currentNavSelection = 'dieRoller';
            ViewUtilities.resetActiveNavSelection();
        });

        RealmApplication.vent.bind('itemListAddItem', function (model) {
            Router.navigate('viewItem');
            RouterController.viewItem(model);
        });

        RealmApplication.vent.bind('characterListChangeCharacter', function (model) {
            Router.navigate('viewCharacter');
            RouterController.viewCharacter(model);
        });

        RealmApplication.vent.bind('characterListDeleteButton:clicked', function (model) {
            // don't need to do anything I think
        });
        RealmApplication.vent.bind('viewItemList', function () {
            Router.navigate('itemList');
            RouterController.itemList();
        });
        RealmApplication.vent.bind('itemListChangeItem', function (model) {
            Router.navigate('viewItem');
            RouterController.viewItem(model);
        });

        RealmApplication.vent.bind('movementManeuverMaintenanceListAddMovementManeuverMaintenance', function (model) {
            Router.navigate('viewMovementManeuverMaintenance');
            RouterController.viewMovementManeuverMaintenance(model);
        });

        RealmApplication.vent.bind('viewMovementManeuverMaintenanceList', function () {
            Router.navigate('movementManeuverMaintenance');
            RouterController.movementManeuverMaintenance();
        });

        RealmApplication.vent.bind('willContestListAddWillContest', function (model) {
            Router.navigate('willContest');
            RouterController.willContest(model);
        });

        RealmApplication.vent.bind('willContestListOpenWillContest', function (model) {
            Router.navigate('willContest');
            RouterController.willContest(model);
        });

    });
