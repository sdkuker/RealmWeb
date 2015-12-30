define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CriticalHitFilterTemplate) {

        var CriticalHitFilterView = Marionette.ItemView.extend({
            template: CriticalHitFilterTemplate,
            events : {
                //'click #addButton' : 'addButtonClicked',
                //'click #changeButton' : 'changeButtonClicked',
                //'click #deleteButton' : 'deleteButtonClicked'
            //},
            //addButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListAddButton:clicked');
            //},
            //changeButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListChangeButton:clicked');
            //},
            //deleteButtonClicked : function() {
            //    RealmApplication.vent.trigger('playerListDeleteButton:clicked');
            },
        });

        return CriticalHitFilterView;

    });
