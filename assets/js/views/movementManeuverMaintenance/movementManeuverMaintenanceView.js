define(['marionette',
    'realmApplication',
    'models/movementManeuverMaintenance/movementManeuverModel',
    'utility/viewUtilities',
    "tpl!templates/movementManeuverMaintenance/movementManeuverMaintenanceTemplate.tpl",
    'logger',
    'services/movementManeuverWarehouse'
], function (Marionette, RealmApplication, MovementManeuverMaintenanceModel, ViewUtilities, MovementManeuverMaintenanceTemplate, Logger,
             MovementManeuverWarehouse) {
    var PlayerView = Marionette.ItemView.extend({
        template: MovementManeuverMaintenanceTemplate,
        model: MovementManeuverMaintenanceModel,
        events: {
            'click #saveButton' : 'saveButtonClicked',
            'click #deleteButton' : 'deleteButtonClicked',
            'click #cancelButton' : 'cancelButtonClicked'
        },
        templateHelpers : function() {

            return {
                getTrivialManeuverResult : this.model.getTrivialManeuverResult(),
                getRoutineManeuverResult : this.model.getRoutineManeuverResult(),
                getEasyManeuverResult : this.model.getEasyManeuverResult(),
                getLightManeuverResult : this.model.getLightManeuverResult(),
                getMediumManeuverResult : this.model.getMediumManeuverResult(),
                getHardManeuverResult : this.model.getHardManeuverResult(),
                getVeryHardManeuverResult : this.model.getVeryHardManeuverResult(),
                getExtremelyHardManeuverResult : this.model.getExtremelyHardManeuverResult(),
                getSheerFollyManeuverResult : this.model.getSheerFollyManeuverResult(),
                getAbsurdManeuverResult : this.model.getAbsurdManeuverResult(),
                getInsaneManeuverResult : this.model.getInsaneManeuverResult(),
                getPhenomenalManeuverResult : this.model.getPhenomenalManeuverResult(),
                getVirtuallyImpossibleManeuverResult : this.model.getVirtuallyImpossibleManeuverResult()
            }
        },
        populateModel : function() {
            var self = this;
            self.model.set('minimumRollValue', self.parseAsInt($('#minimumRollValue').val()));
            self.model.set('maximumRollValue', self.parseAsInt($('#maximumRollValue').val()));
            self.model.setTrivialManeuverResult($('#trivialManeuverResult').val());
            self.model.setRoutineManeuverResult($('#routineManeuverResult').val());
            self.model.setEasyManeuverResult($('#easyManeuverResult').val());
            self.model.setLightManeuverResult($('#lightManeuverResult').val());
            self.model.setMediumManeuverResult($('#mediumManeuverResult').val());
            self.model.setHardManeuverResult($('#hardManeuverResult').val());
            self.model.setVeryHardManeuverResult($('#veryHardManeuverResult').val());
            self.model.setExtremelyHardManeuverResult($('#extremelyHardManeuverResult').val());
            self.model.setSheerFollyManeuverResult($('#sheerFollyManeuverResult').val());
            self.model.setAbsurdManeuverResult($('#absurdManeuverResult').val());
            self.model.setInsaneManeuverResult($('#insaneManeuverResult').val());
            self.model.setPhenomenalManeuverResult($('#phenomenalManeuverResult').val());
            self.model.setVirtuallyImpossibleManeuverResult($('#virtuallyImpossibleManeuverResult').val());
        },
        parseAsInt : function(someValue) {
            var theReturn = 0;
            if (someValue) {
                if (! isNaN(someValue)) {
                    theReturn = parseInt(someValue);
                }
            }
            return theReturn;

        },
        createObjectWithAttributes : function() {
            var self = this;
            var tempObject = {};
            
            tempObject.minimumRollValue = self.parseAsInt($('#minimumRollValue').val());
            tempObject.maximumRollValue = self.parseAsInt($('#maximumRollValue').val());
            tempObject.trivialManeuverResult = encodeURI($('#trivialManeuverResult').val());
            tempObject.routineManeuverResult = encodeURI($('#routineManeuverResult').val());
            tempObject.easyManeuverResult = encodeURI($('#easyManeuverResult').val());
            tempObject.lightManeuverResult = encodeURI($('#lightManeuverResult').val());
            tempObject.mediumManeuverResult = encodeURI($('#mediumManeuverResult').val());
            tempObject.hardManeuverResult = encodeURI($('#hardManeuverResult').val());
            tempObject.veryHardManeuverResult = encodeURI($('#veryHardManeuverResult').val());
            tempObject.extremelyHardManeuverResult = encodeURI($('#extremelyHardManeuverResult').val());
            tempObject.sheerFollyManeuverResult = encodeURI($('#sheerFollyManeuverResult').val());
            tempObject.absurdManeuverResult = encodeURI($('#absurdManeuverResult').val());
            tempObject.insaneManeuverResult = encodeURI($('#insaneManeuverResult').val());
            tempObject.phenomenalManeuverResult = encodeURI($('#phenomenalManeuverResult').val());
            tempObject.virtuallyImpossibleManeuverResult = encodeURI($('#virtuallyImpossibleManeuverResult').val());
 
           return tempObject;
        },

        saveButtonClicked : function() {
            var self = this;
            // if it's a new model, add it to the collection
            if (! self.model.get('id')) {
                Logger.logInfo('About to add a new movementManeuverMaintenance model to the collection');
                var tempObject = self.createObjectWithAttributes();
                $.when(MovementManeuverWarehouse.addMovementManeuver(tempObject)).then(
                    function() {
                        ViewUtilities.showModalView('Informational', 'Movement Maneuver Saved');
                        RealmApplication.vent.trigger('viewMovementManeuverMaintenanceList');
                    }
                ),
                    function() {
                        console.log('some kind of error getting movementManeuvers for addition of movementManeuver');
                    }
            } else {
                // don't have to do anything if it's modifying an existing model -
                // just move the values to the exiting model.  firebase syncs automatically
                self.populateModel();
                ViewUtilities.showModalView('Informational', 'MovementManeuverMaintenance Saved');
                RealmApplication.vent.trigger('viewMovementManeuverMaintenanceList');
            }

        },
        deleteButtonClicked : function() {
            this.model.destroy();
            Logger.logInfo('movementManeuver model successfully deleted');
            ViewUtilities.showModalView('Informational', 'MovementManeuver Deleted');
            RealmApplication.vent.trigger('viewMovementManeuverMaintenanceList');
        },
        cancelButtonClicked : function() {
            RealmApplication.vent.trigger('viewMovementManeuverMaintenanceList');
        }
    });

    return PlayerView;

});
