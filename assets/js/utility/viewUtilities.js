define(['realmApplication',
        'models/modal/modalModel',
        'views/modal/modalView',
        'views/modal/modalLoginView'],
    function (RealmApplication, ModalModel, ModalView, ModalLoginView) {

        var Utility = function() {
            // private fields
            var self = this;

            // public field
            this.currentNavSelection = null;

            // public functions
            this.resetActiveNavSelection = function() {
                if (self.currentNavSelection) {
                    $('#main-nav-ul').children().removeClass('active');
                    $('#' + self.currentNavSelection).addClass('active');
                }
            };
            this.showModalView = function(aTitle, aMessage) {
                var modalModel = new ModalModel({title: aTitle, message : aMessage});
                var modalView = new ModalView({model : modalModel});
                RealmApplication.modalRegion.show(modalView);
            };
            this.showLoginModalView = function() {
                var modalModel = new ModalModel();
                var modalLoginView = new ModalLoginView({model : modalModel});
                RealmApplication.modalRegion.show(modalLoginView);
            }
        }

        return new Utility();

    });