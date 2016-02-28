define(['backbone'],
    function (Backbone) {

        var CriticalHitModel = Backbone.Model.extend({
            defaults: {
                type : '',
                severity : '',
                rollMinimumValue : '',
                rollMaximumValue : '',
                description : ''
            },
            getType: function() {
                return this.get('type');
            },
            getSeverity: function() {
                return this.get('severity');
            },
            getRollMinimumValue: function() {
                return this.get('rollMinimumValue');
            },
            getRollMaximumValue: function() {
                return this.get('rollMaximumValue');
            },
            getDescription: function() {
                return this.get('description');
            },
            setType: function(aValue) {
                return this.set('type', aValue);
            },
            setSeverity: function(aValue) {
                return this.set('severity', aValue);
            },
            setRollMinimumValue: function(aValue) {
                return this.set('rollMinimumValue', aValue);
            },
            setRollMaximumValue: function(aValue) {
                return this.set('rollMaximumValue', aValue);
            },
            setDescription: function(aValue) {
                return this.set('description', aValue);
            }

        });

        return CriticalHitModel;

    });
