define(['marionette',
    "tpl!templates/workInProgress.tpl"], function (Marionette, WorkInProgressTemplate) {
    var WorkInProgressView = Marionette.ItemView.extend({
        template: WorkInProgressTemplate
    });

    return WorkInProgressView;

});
