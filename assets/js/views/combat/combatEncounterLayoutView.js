define(['marionette',
        "tpl!templates/combat/combatEncounterLayoutTemplate.tpl"],
    function (Marionette, CombatEncounterLayoutTemplate) {

        var CombatEncounterLayoutiew = Marionette.LayoutView.extend({
            template: CombatEncounterLayoutTemplate,
            regions : {
                roundsTableRegion : '#roundsTableRegion',
                roundsButtonsRegion : '#roundsButtonsRegion'
            }
        });

        return CombatEncounterLayoutiew;

    });
