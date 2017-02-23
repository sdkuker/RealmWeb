define([],
    function () {

    Utilities = function() {
        var self = this;
        var authUI = new firebaseui.auth.AuthUI(firebase.auth());

        this.getAuthUI = function() {
            return authUI;
        }
    }

    var myUtilities = new Utilities();

    return myUtilities

    });