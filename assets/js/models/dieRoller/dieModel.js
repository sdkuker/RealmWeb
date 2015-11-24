define(['backbone',],
    function (Backbone) {
    var DieModel = Backbone.Model.extend({

        defaults: {
            currentRoll: 'none',
            previousRolls: 'none',
            numberOfRolls: '0'
        }
    });

    return DieModel;

});
