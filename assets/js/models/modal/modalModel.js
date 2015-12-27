define(['backbone'],
    function (Backbone) {

        var ModalModel = Backbone.Model.extend({
            defaults: {
                title: '',
                message : ''
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
            }
        });

        return ModalModel;

    });
