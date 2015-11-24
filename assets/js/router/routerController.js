define(['realmApplication',
        'views/workInProgressView',
        'views/dieRoller/dieRollerView',
        'models/dieRoller/dieModel'
    ],
    function (RealmApplication,  WorkInProgressView, DieRollerView, DieModel) {

        RouterController = {
            workInProgress: function () {
                var view = new WorkInProgressView();
                RealmApplication.regions.mainRegion.show(view);
            },
            dieRoller: function () {
                var dieModel = new DieModel();
                var view = new DieRollerView({model: dieModel});

                RealmApplication.regions.mainRegion.show(view);
            }
        };

        return RouterController;

    });
