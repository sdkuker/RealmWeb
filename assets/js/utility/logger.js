define([],
    function () {
        var Logger = {

            logErrror : function(message) {
                console.log('Error: ' + message);
            },
            logInfo : function(message) {
                console.log('Info: ' + message);
            }
        };

        return Logger;

    });
