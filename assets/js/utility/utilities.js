define([],
    function () {

        var Utility = function() {
            // private fields
            var self = this;

            // public functions
            this.setCookie = function(cookieName, cookieValue, expirationInDays){
                var d = new Date();
                d.setTime(d.getTime() + (expirationInDays*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
            };
            this.deleteCookie = function(cookieName){
                var d = new Date("October 13, 2014 11:13:00");
                var expires = "expires="+ d.toUTCString();
                document.cookie = cookieName + "=" + ";" + expires + ";path=/";
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