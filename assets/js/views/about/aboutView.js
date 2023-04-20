define(['marionette',
    'realmApplication',
    'models/about/aboutModel',
    "tpl!templates/about/aboutTemplate.tpl",
    'logger'
], function (Marionette, RealmApplication, AboutModel, AboutTemplate, Logger) {
    var AboutView = Marionette.ItemView.extend({
        template: AboutTemplate,
        model: AboutModel,

        initialize : function() {
            var self = this;
        },
        templateHelpers : function() {
            var myVersion = this.model.getVersion();
           
            return {
                myVersion : myVersion
            }
        }
    });

    return AboutView;

});
