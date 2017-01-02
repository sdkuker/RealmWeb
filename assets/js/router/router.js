define(['marionette',
        'router/routerController'],
    function (Marionette, RouterController) {

    var AppRouter = Marionette.AppRouter.extend({
        controller: RouterController,
        appRoutes: {
            'criticalHits': 'criticalHits',
            'criticalHits/:combatEncounterID' : 'criticalHits',
            'criticalHits/:combatEncounterID/:characterID' : 'criticalHits',
            'resistanceTable': 'workInProgress',
            'dieRoller': 'dieRoller',
            'herbLore': 'workInProgress',
            'players': 'playerList',
            'characterList': 'characterList',
            'viewCharacter' : 'viewCharacter',
            'itemList': 'workInProgress',
            'willContestList': 'workInProgress',
            'movementManeuvers': 'workInProgress',
            'combatEncounterList' : 'combatEncounterList',
            'addChangeCombatEncounter' : 'addChangeCombatEncounter',
            'viewPlayer' : 'viewPlayer',
            '*path': 'dieRoller'
        }
    });

    var myAppRouter = new AppRouter();

    return myAppRouter;
});
