define(['backbone'],
    function (Backbone) {

        var ItemModel = Backbone.Model.extend({
            defaults: {
                name: '',
                id : '',
                will : 0,
                willModifier : 0
            },
            getName: function() {
                return decodeURI(this.get('name'));
            },
            setName: function(aName) {
                return this.set('name', encodeURI(aName));
            },
            totalWill : function() {
                return this.get('will') + this.get('willModifier');
            },
        });

        return ItemModel;

    });
