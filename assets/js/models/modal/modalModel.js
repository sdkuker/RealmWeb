define(['backbone'],
    function (Backbone) {

        var ModalModel = Backbone.Model.extend({
            defaults: {
                severity: '',
                message : ''
            },
            getSeverity: function() {
                return this.get('severity');
            },
            setSeverity: function(aSeverity) {
                return this.set('severity', aSeverity);
            },
            getMessage: function() {
                return this.get('message');
            },
            setMessage: function(aMessage) {
                return this.set('message', aMessage);
            }
        });

        return ModalModel;

    });
