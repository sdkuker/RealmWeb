define(['marionette',
        'realmApplication',
        "tpl!templates/willContestConsequenceMaintenance/willContestConsequenceMaintenanceListItemTemplate.tpl",
        'models/willContestConsequenceMaintenance/willContestConsequenceModel',
        'services/willContestConsequenceWarehouse',
        'utility/viewUtilities'],
    function (Marionette, RealmApplication, WillContestConsequenceMaintanenceListItemTemplate, WillContestConsequenceModel,
              WillContestConsequenceWarehouse, ViewUtilities) {
        var WillContestConsequenceMaintenanceItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : WillContestConsequenceModel,
            template: WillContestConsequenceMaintanenceListItemTemplate,
            newModelAttributes : {},
            initialize : function(options) {
                this.listenTo(this.model, 'change', this.render);
            },
            templateHelpers : function() {
                var myDescription = null;
                if (this.model.get('description')) {
                  //  console.log('description: ' + this.model.get('description'));
                    myDescription = decodeURI(this.model.get('description').replace(/%\s/g, " percent "));
                };
                var actionLabel = this.model.get('id') ? 'Delete' : 'Add';
                return {
                    myDescription : myDescription,
                    actionLabel : actionLabel
                }
            },
            events : {
                'click #actionConsequenceButton' : 'actionButtonClicked',
                'blur #description' : 'descriptionModified',
                'blur #minimumRollValue' : 'minimumRollValueModified',
                'blur #maximumRollValue' : 'maximumRollValueModified',
                'blur #permanentBonus' : 'permanentBonusModified',
                'blur #temporaryBonus' : 'temporaryBonusModified',
                'blur #durationInRoundsOfTemporaryBonus' : 'durationOfTemporaryBonusModified'
            },
            descriptionModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[0].innerText);
                self.persistAttributeChange('description',cellValue);
            },
            minimumRollValueModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[1].innerText);
                if (! self.isNormalInteger(cellValue)) {
                    ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                } else {
                    self.persistAttributeChange('minimumRollValue',cellValue);
                }
            },
            maximumRollValueModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[2].innerText);
                if (! self.isNormalInteger(cellValue)) {
                    ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                } else {
                    self.persistAttributeChange('maximumRollValue',cellValue);
                }
            },
            permanentBonusModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[3].innerText);
                if (! self.isNormalInteger(cellValue)) {
                    ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                } else {
                    self.persistAttributeChange('permanentBonus',cellValue);
                }
            },
            temporaryBonusModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[4].innerText);
                if (! self.isNormalInteger(cellValue)) {
                    ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                } else {
                    self.persistAttributeChange('temporaryBonus',cellValue);
                }
            },
            durationOfTemporaryBonusModified : function(event) {
                var self = this;
                var cellValue = encodeURI(this.el.cells[5].innerText);
                if (! self.isNormalInteger(cellValue)) {
                    ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                } else {
                    self.persistAttributeChange('durationInRoundsOfTemporaryBonus',cellValue);
                }
            },
            timeout: null,
            self : null,
            cellBeingEdited : null,
            inputEvent : null,
            persistAttributeChange : function(modelAttributeName, targetValue) {
                var self = this;
                if (self.model.get('id')) {
                    self.model.set(modelAttributeName, targetValue);
                    self.render();
                } else {
                    self.newModelAttributes[modelAttributeName] = targetValue;
                };
            },
            isNormalInteger: function(string) {
                return /^[\+\-]?\d+$/.test(string);
            },
            onRender : function() {
                var self = this;
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();
                }
            },
            actionButtonClicked : function(event) {
                if (this.model.id) {
                    RealmApplication.vent.trigger('willContestConsequenceMaintenanceActionButton:clicked', this.model);
                } else {
                    // require mandatory fields
                    if (this.newModelAttributes.description &&
                        this.newModelAttributes.minimumRollValue && this.newModelAttributes.maximumRollValue) {
                        var copiedObject = jQuery.extend({}, this.newModelAttributes);
                        this.newModelAttributes = {};
                        this.render();
                        RealmApplication.vent.trigger('willContestConsequenceMaintenanceActionButton:clicked', copiedObject);
                    } else {
                        ViewUtilities.showModalView('Error', 'Must change the description and provide all attributes before you can add');
                    }
                }

            }
        });

        return WillContestConsequenceMaintenanceItemView;

    });
