define(['realmApplication',
        'views/workInProgressView'],
    function (RealmApplication,  WorkInProgressView) {

        RouterController = {
            workInProgress: function () {
                var view = new WorkInProgressView();
                RealmApplication.regions.mainRegion.show(view);
            }
        };

        return RouterController;

    });
