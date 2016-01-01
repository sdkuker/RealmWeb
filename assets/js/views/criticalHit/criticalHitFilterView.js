define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CriticalHitFilterTemplate) {

        var CriticalHitFilterView = Marionette.ItemView.extend({
            template: CriticalHitFilterTemplate,
            criticalHits :null,
            events : {
                //'click #addButton' : 'addButtonClicked',
                //'click #changeButton' : 'changeButtonClicked',
                //'click #deleteButton' : 'deleteButtonClicked'
            //},
            //addButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListAddButton:clicked');
            //},
            //changeButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListChangeButton:clicked');
            //},
            //deleteButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListDeleteButton:clicked');
            },
            onRender : function() {
                var typeSelectElement = this.$el.find('#typeSelect');
                var allTypes = this.options.criticalHits.getAllTypes();
                for(type in allTypes) {
                    typeSelectElement.append("<option value='" + type + "'>" + type + "</option>");
                };

                var selectedType = $('#typeSelect option:selected').val();
                if (! selectedType) {
                    var firstSelectOption = typeSelectElement.find('option:first');
                    if (firstSelectOption) {
                        firstSelectOption.attr('selected', true);
                        selectedType = firstSelectOption.val();
                    }
                };

                var allSeverities = null;
                if (selectedType) {
                    allSeverities = this.options.criticalHits.getSeveritiesForType(selectedType);
                } else {
                    allSeverities = this.options.criticalHits.getAllSeverities();
                }
                for(severity in allSeverities) {
                    if (severity && severity != 'undefined') {
                        this.$el.find('#severitySelect').append("<option value='" + severity + "'>" + severity + "</option>");
                    };
                };

            },
        });

        return CriticalHitFilterView;

    });
