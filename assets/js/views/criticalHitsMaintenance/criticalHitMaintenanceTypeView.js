define(['marionette',
        'backbone',
        'realmApplication',
        'utility/viewUtilities',
        'services/criticalHitWarehouse',
        'tpl!templates/criticalHitMaintenance/criticalHitMaintenanceTypeTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, ViewUtilities, CriticalHitWarehouse,
              CriticalHitMaintenanceTypeTemplate) {

        var CriticalHitMaintenanceTypeView = Marionette.ItemView.extend({
            template: CriticalHitMaintenanceTypeTemplate,
            events : {
                'click #addTypeButton' : 'addCriticalButtonClicked',
                'click #deleteTypeButton' : 'deleteCriticalButtonClicked',
                'change #typeSelect' : 'typeSelected'
            },
            selectedType : null,
            initialize : function(options) {
                self = this;
                self.selectedType = options.selectedType;
                self.listenTo(self.options.criticalHitTypes, 'add', self.render);
            },
            onRender : function() {
                var self = this;
                var typeSelectElement = this.$el.find('#typeSelect');
                typeSelectElement.empty();
                self.options.criticalHitTypes.forEach(function(myType, key, list) {
                    var appendString = "<option value='" + myType.get('id') +  "'";
                    if ((key == 0 && ! self.selectedType) || (self.selectedType && self.selectedType == myType.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.selectedType) {
                            self.selectedType = myType.get('id');
                        }
                    };
                    appendString = appendString + ">" + myType.get('id') + "</option>"
                    typeSelectElement.append(appendString);
                });
                if (self.selectedType) {
                    if (self.options.criticalHits && self.options.criticalHits.length > 0) {
                        $('#deleteTypeButton', this.$el).prop('disabled', true);
                    } else {
                        $('#deleteTypeButton', this.$el).prop('disabled', false);
                    }
                } else {
                    $('#deleteTypeButton', this.$el).prop('disabled', true);
                }
            },
            typeSelected : function() {
                self = this;
                self.selectedType = $('#typeSelect option:selected').val();
                RealmApplication.vent.trigger('criticalHitMaintenanceType:typeSelected', self.selectedType);
            },
            addCriticalButtonClicked : function(event ) {
                var newTypeName = $('#newType').val();
                if (newTypeName) {
                    $.when(CriticalHitWarehouse.addType({id: newTypeName})).then (
                        function() {
                            ViewUtilities.showModalView('Information', 'Type ' + newTypeName + ' was added.');
                            self.render();
                        }
                    )
                } else {
                    ViewUtilities.showModalView('Error', 'You must specify the type name before clicking Add');
                }
            },
            deleteCriticalButtonClicked : function() {
                self = this;
                if (self.selectedType) {
                    $.when(CriticalHitWarehouse.removeType(self.selectedType)).then (
                        function() {
                            ViewUtilities.showModalView('Information', 'Type ' + self.selectedType + ' was deleted.');
                            self.selectedType = null;
                            self.render();
                        }
                    )
                } else {
                    ViewUtilities.showModalView('Error', 'You must choose a type before clicking Delete');
                }
            },
        });

        return CriticalHitMaintenanceTypeView;

    });
