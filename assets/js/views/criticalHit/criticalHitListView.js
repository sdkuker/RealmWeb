define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    "tpl!templates/criticalHit/criticalHitListTemplate.tpl",
    'views/criticalHit/criticalHitListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, CriticalHitListTemplate, CriticalHitItemView) {
    var CriticalHitListView = Marionette.CompositeView.extend({
        tagName : 'ul',
        id : 'criticalHitList',
        className : 'list-group',
        template: CriticalHitListTemplate,
        childView : CriticalHitItemView,
        childViewContainer : 'ul',
        selectedModel : ''
    });

    return CriticalHitListView;

});
