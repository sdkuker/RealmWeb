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
            Router.navigate('viewPlayer');
            RouterController.viewPlayer(model);
        });

    });
