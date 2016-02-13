define(['backbone'],
    function (Backbone) {

        var UserModel = Backbone.Model.extend({
            _parse_class_name : 'User',
            idAttribute : 'objectId',
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
