define([
    'realmApplication',
    'marionette'
], function(RealmApplication, Marionette){

    return  Marionette.Region.extend({
        el: '#modal-region',
        onShow: function(view){
            this.listenTo(view, "modal:close", this.closeDialog);

            var self = this;
            this.$el.modal({
                backdrop: true,
                keyboard: true,
                show: true
            });
        },

        closeDialog: function(){
            this.stopListening();
            //this.close();
            this.$el.modal('hide');
        }
    });

});