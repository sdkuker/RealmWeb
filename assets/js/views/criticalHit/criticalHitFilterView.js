define(['marionette',
        'backbone',
        'realmApplication',
        'tpl!templates/criticalHit/criticalHitFilterTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, CriticalHitFilterTemplate) {

        var CriticalHitFilterView = Marionette.ItemView.extend({
            template: CriticalHitFilterTemplate,
            criticalHits :null,
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
            onRender : function() {
                var allTypes = this.options.criticalHits.getAllTypes();
                for(type in allTypes) {
                    this.$el.find('#typeSelect').append("<option value='" + type + "'>" + type + "</option>");
                };
                var allSeverities = this.options.criticalHits.getAllSeverities();
                for(severity in allSeverities) {
                    this.$el.find('#severitySelect').append("<option value='" + severity + "'>" + severity + "</option>");
                };

            },
        });

        return CriticalHitFilterView;

    });
