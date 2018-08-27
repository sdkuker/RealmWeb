define(['marionette',
    'realmApplication',
    "tpl!templates/criticalHit/criticalHitListItemTemplate.tpl",
    'models/criticalHit/criticalHitModel'], function (Marionette, RealmApplication, CriticalHitListItemTemplate, CriticalHitModel) {
    var CriticalHitListItemView = Marionette.ItemView.extend({
        tagName : 'li',
        model : CriticalHitModel,
        template: CriticalHitListItemTemplate,
        templateHelpers : function() {
            var myDescription = null;
            if (this.model.get('description')) {
                myDescription = decodeURI(this.model.get('description').replace(/%\s/g, " percent "));
            };
            return {
                myDescription : myDescription
            }
        },
    });

    return CriticalHitListItemView;

});
