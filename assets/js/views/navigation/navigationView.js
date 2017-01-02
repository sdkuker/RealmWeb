define(['realmApplication', 'marionette',
        "tpl!templates/navigation/navControls.tpl"], function (RealmApplication, Marionette, NavControlsTemplate) {
    var navigationView = Marionette.ItemView.extend({
        template: NavControlsTemplate,
        initialize : function() {
            var self = this;
            RealmApplication.vent.bind('navigationEvent', function (navTargetViewName) {
             self.activateListItemFor(navTargetViewName);
            });
        },
        onShow: function() {
            $('#main-nav li a').on('click', function() {
                $(this).parent().parent().find('.active').removeClass('active');
                $(this).parent().addClass('active');
            });
        },
        activateListItemFor : function(navTargetViewName) {
            console.log(navTargetViewName);
            var listElement = $('#main-nav-ul');
            var activeListItems = listElement.find('.active');
            if (navTargetViewName) {
                if (navTargetViewName == 'criticalHits') {
                    if (activeListItems && activeListItems.text() != 'Critical Hits') {
                        activeListItems.removeClass('active');
                        $('li:contains("Critical Hits")').addClass('active');
                    }
                } else {
                    if (navTargetViewName == 'combatEncounterList') {
                        if (activeListItems && activeListItems.text() != 'Combat') {
                            activeListItems.removeClass('active');
                            $('li:contains("Combat")').addClass('active');
                        }
                    }
                }
            }


        }
    });

    return navigationView;

});
