define(['backbone'],
    function (Backbone) {

        var PlayerModel = Backbone.Model.extend({
            defaults: {
                name: '',
                id : '',
                administrator : false
            },
            getName: function() {
                return decodeURI(this.get('name'));
            },
            setName: function(aName) {
                return this.set('name', encodeURI(aName));
            }
        });

        return PlayerModel;

    });
