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
                'click #deleteTypelButton' : 'deleteCriticalButtonClicked'
            },
            chosenType : null,
            initialize : function() {
                self = this;
                $(document.body).on('change', '#typeSelect', function(e) {
                    self.typeSelected();
                });
                self.listenTo(self.options.criticalHitTypes, 'add', self.render);
            },
            onRender : function() {
                self = this;
                var typeSelectElement = this.$el.find('#typeSelect');
                typeSelectElement.empty();
                this.options.criticalHitTypes.forEach(function(myType, key, list) {
                    var appendString = "<option value='" + myType.get('id') +  "'";
                    if ((key == 0 && ! self.chosenType) || (self.chosenType && self.chosenType == myType.get('id'))) {
                        appendString = appendString + " selected='selected'";
                        if (! self.chosenType) {
                            self.chosenType = myType.get('id');
                        }
                    };
                    appendString = appendString + ">" + myType.get('id') + "</option>"
                    typeSelectElement.append(appendString);
                });
                if (self.chosenType) {
                    if (self.options.criticalHits && self.options.criticalHits.length > 0) {
                        $('#deleteTypeButton', this.$el).prop('disabled', false);
                    } else {
                        $('#deleteTypeButton', this.$el).prop('disabled', true);
                    }
                } else {
                    $('#deleteTypeButton', this.$el).prop('disabled', true);
                }
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                $.when(CriticalHitWarehouse.getCriticalHitsForType(self.chosenType)).then (
                    function(criticalHitCollection) {
                        self.options.criticalHits = criticalHitCollection;
                        self.render();
                    },
                    function(errorString) {
                        console.log(errorString);
                    }
                )
            },
            addCriticalButtonClicked : function(event ) {
                var newTypeName = $('#newType').val();
                if (newTypeName) {
                    CriticalHitWarehouse.addType({id: newTypeName});
                } else {
                    ViewUtilities.showModalView('Error', 'You must specify the type name before clicking Add');
                }
                self.render();
            },
            deleteCriticalButtonClicked : function() {
                self = this;
                //TODO do this
                self.render();
            },
        });

        return CriticalHitMaintenanceTypeView;

    });
