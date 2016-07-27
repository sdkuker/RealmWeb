define(['marionette',
    "tpl!../../templates/combat/combatEncounterListLayoutTemplate.tpl"],
    function (Marionette, CombatEncounterListLayoutTemplate) {

    var CombatEncounterListLayoutiew = Marionette.LayoutView.extend({
        template: CombatEncounterListLayoutTemplate,
        regions : {
            combatEncountersTableRegion : '#combatEncountersTableRegion',
            buttonsRegion : '#buttonsRegion'
        }
    });

    return CombatEncounterListLayoutiew;

});
