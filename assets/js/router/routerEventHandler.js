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

    });
