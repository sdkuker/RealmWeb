define(['realmApplication',
        'models/modal/modalModel',
        'views/modal/modalView',],
    function (RealmApplication, ModalModel, ModalView) {

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
            this.showModalView = function(aTitle, aMessage, myMode) {
                var modalModel = new ModalModel({title: aTitle, message : aMessage, mode: myMode});
                var modalView = new ModalView({model : modalModel});
                RealmApplication.modalRegion.show(modalView);
            }
        }

        return new Utility();

    });