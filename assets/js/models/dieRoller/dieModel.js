define(['backbone', 'domain/die/die'],
    function (Backbone, Die) {
    var DieModel = Backbone.Model.extend({

        defaults: {
            currentRoll: 'none',
            previousRolls: 'none',
            numberOfRolls: 0,
            numberOfPreviousRollsToDisplay: 10,
            mostRecentRollValue: 0
        },
        roll : function() {
            this.set('mostRecentRollValue', this.get('currentRoll'));
            this.set('currentRoll',  Die.roll(6));
            this.updateStats();
        },
        updateStats: function() {
            this.set('numberOfRolls', this.get('numberOfRolls') + 1);
            if (this.get('numberOfRolls') > 1) {
                if (this.get('previousRolls') ==  'none') {
                    this.set('previousRolls', this.get('mostRecentRollValue'));
                } else {
                    if (this.get('numberOfRolls') > this.get('numberOfPreviousRollsToDisplay') + 1) {
                        var newValue = this.get('mostRecentRollValue') + ' ';
                        var tokens = this.get('previousRolls').split(' ');
                        for (index = 0; index < this.get('numberOfPreviousRollsToDisplay') -1; index++) {
                            newValue = newValue + tokens[index] + ' ';
                        };
                        this.set('previousRolls', newValue);
                    } else {
                        this.set('previousRolls', this.get('mostRecentRollValue') + ' ' + this.get('previousRolls'));
                    }
                }
            }

        }
    });

    return DieModel;

});
