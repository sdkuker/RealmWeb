define(['marionette',
        'realmApplication',
        "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceListItemTemplate.tpl",
        'models/criticalHit/criticalHitModel',
        'services/criticalHitWarehouse',
        'utility/viewUtilities'],
    function (Marionette, RealmApplication, CriticalHitMaintanenceListItemTemplate, CriticalHitModel,
              CriticalHitWarehouse, ViewUtilities) {
        var CriticalHitMaintenanceItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : CriticalHitModel,
            template: CriticalHitMaintanenceListItemTemplate,
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
                'click #actionCriticalHitButton' : 'actionButtonClicked'
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
                        case 'severity':
                            modelAttributeName = 'severity';
                            break;
                        case 'rollMinimumValue':
                            modelAttributeName = 'rollMinimumValue';
                            break;
                        case 'rollMaximumValue':
                            modelAttributeName = 'rollMaximumValue';
                            break;
                        case 'description':
                            modelAttributeName = 'description';
                            break;
                    }
                    if (modelAttributeName == 'rollMinimumValue' || modelAttributeName == 'rollMaximumValue') {
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
                    RealmApplication.vent.trigger('criticalHitMaintenanceActionButton:clicked', this.model);
                } else {
                    if (this.newModelAttributes.severity && this.newModelAttributes.rollMinimumValue &&
                        this.newModelAttributes.rollMaximumValue && this.newModelAttributes.description) {
                        var copiedObject = jQuery.extend({}, this.newModelAttributes);
                        this.newModelAttributes = {};
                        this.render();
                        RealmApplication.vent.trigger('criticalHitMaintenanceActionButton:clicked', copiedObject);
                    } else {
                        ViewUtilities.showModalView('Error', 'Must provide all attributes before you can add');
                    }
                }

            }
        });

        return CriticalHitMaintenanceItemView;

    });
