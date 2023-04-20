define(['marionette',
        'router/routerController'],
    function (Marionette, RouterController) {

    var AppRouter = Marionette.AppRouter.extend({
        controller: RouterController,
        appRoutes: {
            'about': 'about',
            'criticalHits': 'criticalHits',
            'criticalHits/:combatEncounterID' : 'criticalHits',
            'criticalHits/:combatEncounterID/:characterID' : 'criticalHits',
            'criticalHitMaintenance' : 'criticalHitMaintenance',
            'resistanceCalculator': 'resistanceCalculator',
            'dieRoller': 'dieRoller',
            'players': 'playerList',
            'characterList': 'characterList',
            'viewCharacter' : 'viewCharacter',
            'itemList': 'itemList',
            'viewItem' : 'viewItem',
            'willContestList': 'willContestList',
            'willContest' : 'willContest',
            'willContestConsequenceMaintenance': 'willContestConsequenceMaintenance',
            'movementManeuvers': 'movementManeuvers',
            'movementManeuverMaintenance': 'movementManeuverMaintenance',
            'combatEncounterList' : 'combatEncounterList',
            'addChangeCombatEncounter' : 'addChangeCombatEncounter',
            'viewPlayer' : 'viewPlayer',
            'login' : 'login',
            '*path': 'login'
        }
    });

    var myAppRouter = new AppRouter();

    return myAppRouter;
});
