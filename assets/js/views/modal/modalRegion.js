define([
    'realmApplication',
    'marionette'
], function(RealmApplication, Marionette){

    return  Marionette.Region.extend({
        el: '#modal-region',
        onShow: function(view){
            var self = this;
            this.$el.modal({
                backdrop: true,
                keyboard: true,
                show: true
            });
        },

        closeDialog: function(myMode){
            this.stopListening();
            //this.close();
            this.$el.modal('hide');
            if (myMode == 'login') {
                this.trigger('loginSuccessful');
            }
        }
    });

});