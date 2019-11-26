define(['backbone'],
    function (Backbone) {

        var ResistanceCalculatorResulttModel = Backbone.Model.extend({
            defaults: {
                attackerLevel : 0,
                targetLevel : 0,
                targetResistsAt : 0,
                rollSequence : 0
            },
            getRollSequence: function() {
                return this.get('rollSequence');
            },
            getAttackerLevel: function() {
                return this.get('attackerLevel');
            },
            getTargetLevel: function() {
                return this.get('targetLevel');
            },
            getTargetResistsAt: function() {
                return this.get('targetResistsAt');
            },
            setRollSequence: function(aValue) {
                return this.set('rollSequence', aValue);
            },
            setAttackerLevel: function(aValue) {
                return this.set('attackerLevel', aValue);
            },
            setTargetLevel: function(aValue) {
                return this.set('targetLevel', aValue);
            },
            setTargetResistsAt: function(aValue) {
                return this.set('targetResistsAt', aValue);
            }
        });

        return ResistanceCalculatorResulttModel;

    });
