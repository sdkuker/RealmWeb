define(['marionette',
        "tpl!templates/combatEncounter/combatEncounterDetailsLayoutTemplate.tpl"],
    function (Marionette, CombatEncounterDetailsLayoutTemplate) {

        var CombatEnconterDetailsLayoutiew = Marionette.LayoutView.extend({
            template: CombatEncounterDetailsLayoutTemplate,
            regions : {
                combatEncounterDetailsRoundsListRegion : '#combatEncounterDetailsRoundsListRegion',
                combatEncounterDetailsButtonsRegion : '#combatEncounterDetailsButtonsRegion'
            }
        });

        return CombatEnconterDetailsLayoutiew;

    });
