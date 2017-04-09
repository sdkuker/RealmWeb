define(['backbone'],
    function (Backbone) {

        var ModalModel = Backbone.Model.extend({
            defaults: {
                title: '',
                message : '',
                mode: 'normal'
            },
            getTitle: function() {
                return this.get('title');
            },
            setTitle: function(aTitle) {
                return this.set('title', aTitle);
            },
            getMessage: function() {
                return this.get('message');
            },
            setMessage: function(aMessage) {
                return this.set('message', aMessage);
            },
            getMode: function() {
                return this.get('mode');
            },
            setMode: function(aMode) {
                return this.set('mode', aMode);
            },
        });

        return ModalModel;

    });
