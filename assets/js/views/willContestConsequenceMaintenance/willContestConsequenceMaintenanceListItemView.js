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
                'input' : 'tableCellUpdated',
                'click #actionConsequenceButton' : 'actionButtonClicked'
            },
            timeout: null,
            self : null,
            cellBeingEdited : null,
            inputEvent : null,
            tableCellUpdated : function(event) {
                    self = this;
                self.inputEvent = event;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function() {
                    var targetID = self.inputEvent.target.getAttribute('headers');
                    var targetStringExcludingTags = self.inputEvent.target.innerHTML.replace(/(<([^>]+)>)/ig,"");
                    var targetValue = encodeURI((targetStringExcludingTags));
                    this.cellBeingEdited = targetID;
                    var modelAttributeName = '';

                    switch (targetID) {
                        case 'minimumRollValue':
                            modelAttributeName = 'minimumRollValue';
                            break;
                        case 'maximumRollValue':
                            modelAttributeName = 'maximumRollValue';
                            break;
                        case 'permanentBonus':
                            modelAttributeName = 'permanentBonus';
                            break;
                        case 'temporaryBonus':
                            modelAttributeName = 'temporaryBonus';
                            break;
                        case 'durationInRoundsOfTemporaryBonus':
                            modelAttributeName = 'durationInRoundsOfTemporaryBonus';
                            break;
                        case 'description':
                            modelAttributeName = 'description';
                            break;
                    }
                    if (modelAttributeName == 'minimumRollValue' || modelAttributeName == 'maximumRollValue') {
                        if (! self.isNormalInteger(targetValue)) {
                            ViewUtilities.showModalView('Error', 'Roll values must be integers.');
                        } else {
                            self.persistAttributeChange(modelAttributeName,targetValue);
                        }
                    } else {
                        self.persistAttributeChange(modelAttributeName,targetValue);
                    }

                }, 400);
            },
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
                return /^\+?\d+$/.test(string);
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
                    if (this.newModelAttributes.permanentBonus && this.newModelAttributes.temporaryBonus &&
                        this.newModelAttributes.durationInRoundsOfTemporaryBonus && this.newModelAttributes.description &&
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
