define(['backbone'],
    function (Backbone) {

        var PlayerModel = Backbone.Model.extend({
            defaults: {
                name: '',
                uid : '',
                photo : ''
            },
            getName: function() {
                return decodeURI(this.get('name'));
            },
            setName: function(aName) {
                return this.set('name', encodeURI(aName));
            },
            getUid : function() {
                return this.get('uid');
            },
            setUid : function(aUid) {
                return this.set('uid', aUid);
            },
            getPhoto : function() {
                return this.get('photo');
            },
            setPhote : function(photoURL) {
                return this.set('phote', photoURL);
            }

        });

        return PlayerModel;

    });
