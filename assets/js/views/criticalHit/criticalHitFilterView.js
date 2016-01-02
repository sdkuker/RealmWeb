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
            chosenType : null,
            chosenSeverity : null,
            initialize : function() {
                self = this;
                $(document.body).on('change', '#typeSelect', function(e) {
                    self.typeSelected();
                });
                $(document.body).on('change', '#severitySelect', function(e) {
                    self.severitySelected();
                });
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
                        this.chosenType = firstSelectOption.val();
                    }
                };
                this.populateSeverities();
            },
            typeSelected : function() {
                self = this;
                self.chosenType = $('#typeSelect option:selected').val();
                self.populateSeverities();
            },
            severitySelected : function() {
                self = this;
                self.chosenSeverity = $('#severitySelect option:selected').val();
            },
            populateSeverities : function() {
                var severitySelectElement = this.$el.find('#severitySelect');
                severitySelectElement.empty();
                var allSeverities = null;
                if (this.chosenType) {
                    allSeverities = this.options.criticalHits.getSeveritiesForType(this.chosenType);
                } else {
                    allSeverities = this.options.criticalHits.getAllSeverities();
                };
                for(severity in allSeverities) {
                    if (severity && severity != 'notSelectedType') {
                        severitySelectElement.append("<option value='" + severity + "'>" + severity + "</option>");
                    };
                };
                var firstSeveritySelectOption = severitySelectElement.find('option:first');
                firstSeveritySelectOption.attr('selected', true);
                this.chosenSeverity = firstSeveritySelectOption.val();

            }
        });

        return CriticalHitFilterView;

    });
