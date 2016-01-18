define(['backbone'],
    function (Backbone) {

        var CriticalHitModel = Backbone.Model.extend({
            _parse_class_name : 'CriticalHitType',
            idAttribute : 'objectId',
            defaults: {
                type : ''
            },
            getType: function() {
                return this.get('type');
            },
            setType: function(aValue) {
                return this.set('type', aValue);
            }

        });

        return CriticalHitModel;

    });
