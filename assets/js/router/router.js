define(['marionette',
        'router/routerController'],
    function (Marionette, RouterController) {

    var AppRouter = Marionette.AppRouter.extend({
        controller: RouterController,
        appRoutes: {
            'criticalHits': 'workInProgress',
            'resistanceTable': 'workInProgress',
            'dieRoller': 'dieRoller',
            'herbLore': 'workInProgress',
            'players': 'playerList',
            'characterList': 'workInProgress',
            'itemList': 'workInProgress',
            'willContestList': 'workInProgress',
            'movementManeuvers': 'workInProgress',
            'combatEncounterList' : 'combatEncounterList',
            '*path': 'dieRoller'
        }
    });

    var myAppRouter = new AppRouter();

    return myAppRouter;
});
