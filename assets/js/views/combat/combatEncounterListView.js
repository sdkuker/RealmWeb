define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/combat/combatEncounterModel',
    "tpl!templates/combat/combatEncounterListTemplate.tpl",
    'views/combat/combatEncounterListItemView',
    'services/combatRoundWarehouse',
    'services/combatEncounterWarehouse'],
    function (Marionette, RealmApplication, Logger, ViewUtilities,
                CombatEncounterModel, CombatEncounterListTemplate, CombatEncounterListItemView,
                CombatRoundWarehouse, CombatEncounerWarehouse) {
    var CombatEncounterListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'combatEncounterTable',
        className : 'table table-striped',
        template: CombatEncounterListTemplate,
        childView : CombatEncounterListItemView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            var self = this;
            this.listenTo(RealmApplication.vent, 'combatEncounterListAddButton:clicked', function() {
                self.triggerAddCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListChangeButton:clicked', function() {
                self.triggerEditCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListDeleteButton:clicked', function() {
                self.triggerDeleteCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListOpenButton:clicked', function() {
                self.triggerOpenCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListEncounterSelected', function(tableRow, model) {
                self.combatEncounterSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        triggerAddCombatEncounterFunction : function() {
            $.when(CombatEncounerWarehouse.createCombatEncounter()).then(
                function(newCombatEncounterModel) {
                    RealmApplication.vent.trigger('combatEncounterListAddCombatEncounter', newCombatEncounterModel);
                }
            )
        },
        triggerEditCombatEncounterFunction : function() {
            //var model = this.collection.at($(':selected', this.$el).index());
            RealmApplication.vent.trigger('combatEncounterListChangeCombatEncounter', selectedModel);
        },
        triggerOpenCombatEncounterFunction : function() {
           // var model = this.collection.at($(':selected', this.$el).index());
            RealmApplication.vent.trigger('combatEncounterListOpenCombatEncounter', selectedModel);
        },
        triggerDeleteCombatEncounterFunction : function() {
            var self = this;
            $.when(CombatRoundWarehouse.deleteCombatRoundsForEncounter(selectedModel)).then(
                function() {
                    self.collection.remove(selectedModel);
                    Logger.logInfo('combat encounter model deleted');
                    // ViewUtilities.showModalView('Informational', 'Combat enounter with description: ' + selectedModel.getDescription() + ' Deleted');
                    selectedModel = null;
                    RealmApplication.vent.trigger('viewCombatEncounterList');
                }
            )
        },
        combatEncounterSelected : function(tableRow, model) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            selectedModel = model;
            if (model.hasAnyRounds()) {
                this.trigger('openedEncounterSelected');
            } else {
                this.trigger('unOpenedEncounterSelected');
            }
        }
    });

    return CombatEncounterListView;

});
