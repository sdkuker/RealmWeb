define(['marionette',
        'backbone',
        'realmApplication',
        'services/criticalHitWarehouse',
        'tpl!templates/criticalHitMaintenance/criticalHitMaintenanceTypeTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication,CriticalHitWarehouse,
              CriticalHitMaintenanceTypeTemplate) {

        var CriticalHitMaintenanceTypeView = Marionette.ItemView.extend({
            template: CriticalHitMaintenanceTypeTemplate,
            events : {
                'click #addCriticalButton' : 'addCriticalButtonClicked',
                'click #deleteCriticalButton' : 'deleteCriticalButtonClicked'
            },
            chosenType : null,
            initialize : function() {
                self = this;
                $(document.body).on('change', '#typeSelect', function(e) {
                    self.typeSelected();
                });
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
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                $.when(CriticalHitWarehouse.getCriticalHitsForType(self.chosenType)).then (
                    function(criticalHitCollection) {
                        self.options.criticalHits = criticalHitCollection;
                        self.chosenSeverity = null;
                        self.render();
                    },
                    function(errorString) {
                        console.log(errorString);
                    }
                )
            },
            addCriticalButtonClicked : function() {
                self = this;
                //TODO do this
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
