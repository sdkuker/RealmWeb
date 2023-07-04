define(['marionette',
        "tpl!templates/criticalHit/criticalHitLayoutTemplate.tpl"],
    function (Marionette, CriticalHitLayoutTemplate) {

        var CriticalHitLayoutView = Marionette.LayoutView.extend({
            template: CriticalHitLayoutTemplate,
            regions : {
                criticalHitFilterRegion : '#criticalHitFilterRegion',
                criticalHitDisplayRegion : '#criticalHitDisplayRegion'
            }
        });

        return CriticalHitLayoutView;

    });
