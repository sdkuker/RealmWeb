define(['marionette',
        "tpl!templates/criticalHit/criticalHitLayoutTemplate.tpl"],
    function (Marionette, CriticalHitLayoutTemplate) {

        var CriticalHitLayoutiew = Marionette.LayoutView.extend({
            template: CriticalHitLayoutTemplate,
            regions : {
                criticalHitFilterRegion : '#criticalHitFilterRegion',
                criticalHitDisplayRegion : '#criticalHitDisplayRegion'
            }
        });

        return CriticalHitLayoutiew;

    });
