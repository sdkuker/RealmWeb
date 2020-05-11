define(['marionette',
    'realmApplication',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceListItemTemplate.tpl",
    'models/movementManeuver/movementManeuverModel', 'utility/viewUtilities'],
    function (Marionette, RealmApplication, MovementManeuverMaintenanceListItemTemplate,
        MovementManeuverModel, ViewUtilities) {
        var MovementManeuverMaintenanceListItemView = Marionette.ItemView.extend({
            tagName: 'tr',
            model: MovementManeuverModel,
            template: MovementManeuverMaintenanceListItemTemplate,
            newModelAttributes: {},
            selectedDifficulty: null,
            initialize: function (options) {
                this.listenTo(this.model, 'change', this.render);
                this.selectedDifficulty = options.selectedDifficulty;
                this.newModelAttributes = { 'difficultyId': this.selectedDifficulty.get('id') };
                if (this.model) {
                    this.newModelAttributes.maximumRollValue = this.model.get('maximumRollValue');
                    this.newModelAttributes.minimumRollValue = this.model.get('minimumRollValue');
                    this.newModelAttributes.result = this.model.get('result');
                }
            },
            events: {
                'click #actionManeuverButton': 'actionButtonClicked',
                'blur #result': 'resultModified',
                'blur #minimumRollValue': 'minimumRollValueModified',
                'blur #maximumRollValue': 'maximumRollValueModified'
            },
            templateHelpers: function () {
                var myResult = null;
                if (this.model.get('result')) {
                    myResult = decodeURI(this.model.get('result').replace(/%\s/g, " percent "));
                };
                var actionLabel = this.model.get('id') ? 'Delete' : 'Add';
                return {
                    myResult: myResult,
                    actionLabel: actionLabel
                }
            },
            onRender: function () {
                var self = this;
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();
                }
            },
            resultModified: function (event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[2].textContent);
                self.persistAttributeChange('result', cellValue);
            },
            minimumRollValueModified: function (event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[0].textContent);
                var numericCellValue = parseInt(cellValue);
                if (!self.isNormalInteger(numericCellValue)) {
                    ViewUtilities.showModalView('Error', 'Minimum roll values must be integers.');
                } else {
                    self.persistAttributeChange('minimumRollValue', numericCellValue);
                }
            },
            maximumRollValueModified: function (event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[1].textContent);
                var numericCellValue = parseInt(cellValue);
                if (!self.isNormalInteger(numericCellValue)) {
                    ViewUtilities.showModalView('Error', 'Maximum roll values must be integers.');
                } else {
                    self.persistAttributeChange('maximumRollValue', numericCellValue);
                }
            },
            persistAttributeChange: function (modelAttributeName, targetValue) {
                var self = this;
                if (self.model.get('id')) {
                    self.model.set(modelAttributeName, targetValue);
                    self.render();
                } else {
                    self.newModelAttributes[modelAttributeName] = targetValue;
                };
            },
            isNormalInteger: function (string) {
                return /^[\+\-]?\d+$/.test(string);
            },
            actionButtonClicked: function (event) {
                if (this.model.id) {
                    RealmApplication.vent.trigger('movementManeuverMaintenanceActionButton:clicked', this.model);
                } else {
                    // require mandatory fields
                    if (this.newModelAttributes.hasOwnProperty('result') &&
                        this.newModelAttributes.hasOwnProperty('minimumRollValue') &&
                        this.newModelAttributes.hasOwnProperty('maximumRollValue')) {
                            var copiedObject = jQuery.extend({}, this.newModelAttributes);
                            this.newModelAttributes = {};
                            this.render();
                            RealmApplication.vent.trigger('movementManeuverMaintenanceActionButton:clicked', copiedObject);
                    } else {
                        ViewUtilities.showModalView('Error', 'Must speicify the result, roll minimum and roll maximum before you can add');
                    }
                }
            }
        });

        return MovementManeuverMaintenanceListItemView;

    });
