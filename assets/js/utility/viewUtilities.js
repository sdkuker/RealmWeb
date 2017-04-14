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
            this.disableAllNavSelections = function() {
                $('#main-nav-ul').children().removeClass('active');
                $('#main-nav-ul').children().addClass('disabled');
                $('#main-nav-ul').children().on('click', function(e) {
                    e.preventDefault();
                })
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
            };
            this.setCookie = function(cookieName, cookieValue, expirationInDays){
                var d = new Date();
                d.setTime(d.getTime() + (expirationInDays*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
            };
            this.getCookie = function(cookieName) {
                var name = cookieName + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            };
        }

        return new Utility();

    });