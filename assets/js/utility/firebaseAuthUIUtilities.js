define([],
    function () {

    Utilities = function() {
        var self = this;
        var authUI = new firebaseui.auth.AuthUI(firebase.auth());
        var user = null;

        this.getAuthUI = function() {
            return authUI;
        };
        this.setUser = function(aUser) {
            user = aUser;
        };
        this.getUser = function() {
            return user;
        };
        this.isUserLoggedIn = function() {
            return user != null;
        }

    }

    var myUtilities = new Utilities();

    return myUtilities

    });