define(['realmApplication',
        'models/modal/modalModel',
        'views/modal/modalView',],
    function (RealmApplication, ModalModel, ModalView) {

        var utilities = {
            showModalView : function(aTitle, aMessage) {
                var modalModel = new ModalModel({title: aTitle, message : aMessage});
                var modalView = new ModalView({model : modalModel});
                RealmApplication.modalRegion.show(modalView);
            }
        };

        return utilities;

    });