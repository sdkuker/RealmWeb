define(['marionette',
        'realmApplication',
        "tpl!templates/criticalHitMaintenance/criticalHitMaintenanceListItemTemplate.tpl",
        'models/criticalHit/criticalHitModel',
        'services/criticalHitWarehouse'],
    function (Marionette, RealmApplication, CriticalHitMaintanenceListItemTemplate, CriticalHitModel, CriticalHitWarehouse) {
        var CriticalHitMaintenanceItemView = Marionette.ItemView.extend({
            tagName : 'tr',
            model : CriticalHitModel,
            template: CriticalHitMaintanenceListItemTemplate,
            initialize : function(options) {
               // this.isOpenRound = options.isOpenRound;
            },
            templateHelpers : function() {
                var myDescription = null;
                if (this.model.get('description')) {
                  //  console.log('description: ' + this.model.get('description'));
                    myDescription = decodeURI(this.model.get('description').replace(/%\s/g, " percent "));
                };
                return {
                    myDescription : myDescription
                }
            },
            events : {
                'input' : 'tableCellUpdated'
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
                            modelAttributeName = 'roundsStillStunned';
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
                    self.model.set(modelAttributeName, targetValue);
                    self.render();

                }, 800);
            },
            onRender : function() {
                var self = this;
                if (this.cellBeingEdited) {
                    $(this.$el).find("[headers='" + this.cellBeingEdited + "']").focus();
                }
            }
        });

        return CriticalHitMaintenanceItemView;

    });
