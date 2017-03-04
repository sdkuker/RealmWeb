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
                    $('#' + this.currentNavSelection).addClass('active');
                }
            };
            this.showModalView = function(aTitle, aMessage) {
                var modalModel = new ModalModel({title: aTitle, message : aMessage});
                var modalView = new ModalView({model : modalModel});
                RealmApplication.modalRegion.show(modalView);
            }
        }

        return new Utility();

    });