define(['parse'],
    function (Parse) {

        var PlayerMode = Parse.Object.extend({
            className: 'Player',
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

        return DieModel;

    });
