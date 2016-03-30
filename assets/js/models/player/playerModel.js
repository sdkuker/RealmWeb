define(['backbone'],
    function (Backbone) {

        var PlayerModel = Backbone.Model.extend({
            defaults: {
                name: ''
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
