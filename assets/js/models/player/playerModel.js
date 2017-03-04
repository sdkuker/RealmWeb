define(['backbone'],
    function (Backbone) {

        var PlayerModel = Backbone.Model.extend({
            defaults: {
                name: '',
                uid : ''
            },
            getName: function() {
                return decodeURI(this.get('name'));
            },
            setName: function(aName) {
                return this.set('name', encodeURI(aName));
            },
            getUid : function() {
                return uid;
            },
            setUid : function(aUid) {
                return this.set('uid', aUid);
            }

        });

        return PlayerModel;

    });
