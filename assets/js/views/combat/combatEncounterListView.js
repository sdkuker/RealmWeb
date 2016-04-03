define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/combat/combatEncounterModel',
    "tpl!templates/combat/combatEncounterListTemplate.tpl",
    'views/combat/combatEncounterListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities,
                   CombatEncounterModel, CombatEncounterListTemplate, CombatEncounterView) {
    var CombatEncounterListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'combatEncounterTable',
        className : 'table table-striped',
        template: CombatEncounterListTemplate,
        childView : CombatEncounterView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            self = this;
            this.listenTo(RealmApplication.vent, 'combatEncounterListAddButton:clicked', function() {
                self.triggerAddCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListChangeButton:clicked', function() {
                self.triggerEditCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListDeleteButton:clicked', function() {
                self.triggerDeleteCombatEncounterFunction();
            });
            this.listenTo(RealmApplication.vent, 'combatEncounterListEncounterSelected', function(tableRow, model) {
                self.combatEncounterSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        onRender : function() {
            console.log('in onRender');
        },
        triggerAddCombatEncounterFunction : function() {
            RealmApplication.vent.trigger('combatEncounterListAddCombatEncounter', new CombatEncounterModel());
        },
        triggerEditCombatEncounterFunction : function() {
            var model = this.collection.at($(':selected', this.$el).index());
            RealmApplication.vent.trigger('combatEncounterListChangeCombatEncounter', model);
        },
        triggerDeleteCombatEncounterFunction : function() {
            this.collection.remove(selectedModel);
            Logger.logInfo('combat encounter model deleted');
            ViewUtilities.showModalView('Informational', 'Combat enounter with description: ' + selectedModel.getDescription() + ' Deleted');
            selectedModel = null;
            RealmApplication.vent.trigger('viewCombatEncounterList');
        },
        combatEncounterSelected : function(tableRow, model) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            selectedModel = model;
        }
    });

    return CombatEncounterListView;

});
