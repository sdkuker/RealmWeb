define(['marionette',
        'router/routerController'],
    function (Marionette, RouterController) {

    var AppRouter = Marionette.AppRouter.extend({
        controller: RouterController,
        appRoutes: {
            'criticalHits': 'workInProgress',
            'resistanceTable': 'workInProgress',
            'dieRoller': 'workInProgress',
            'herbLore': 'workInProgress',
            'players': 'workInProgress',
            'characterList': 'workInProgress',
            'itemList': 'workInProgress',
            'willContestList': 'workInProgress',
            'movementManeuvers': 'workInProgress',
            '*path': 'workInProgress'
        }
    });

    var myAppRouter = new AppRouter();

    return myAppRouter;
});
