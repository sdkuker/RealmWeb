define(['backbone'],
    function (Backbone) {

        var PlayerModel = Backbone.Model.extend({
            defaults: {
                name: ''
            },
            getName: function() {
                return this.get('name');
            },
            setName: function(aName) {
                return this.set('name', aName);
            }

        });

        return PlayerModel;

    });
