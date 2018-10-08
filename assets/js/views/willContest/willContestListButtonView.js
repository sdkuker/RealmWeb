define(['marionette',
        'backbone',
        'realmApplication',
        'services/playerWarehouse',
        'tpl!templates/willContest/willContestListButtonTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, PlayerWarehouse,
              WillContestListButtonTemplate) {

        var WillContestListButtonView = Marionette.ItemView.extend({
            template: WillContestListButtonTemplate,
            events: {
                'click #createWillContestButton': 'createWillContestButtonClicked',
                'click #openWillContestButton': 'openWillContestButtonClicked',
                'click #deleteWillContestButton': 'deleteWillContestButtonClicked',
            },
            onRender: function () {
                var self = this;
                if (!PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                    $('#createContestButton', this.el).prop('disabled', true);
                    $('#deleteContestButton', this.el).prop('disabled', true);
                } else {
                    $('#createContestButton', this.el).prop('disabled', false);
                    $('#deleteContestButton', this.el).prop('disabled', false);
                }
            },
            createWillContestButtonClicked: function () {
                RealmApplication.vent.trigger('createWillContestButton:clicked');
            },
            openWillContestButtonClicked: function () {
                RealmApplication.vent.trigger('openWillContestButton:clicked');
            },
            deleteWillContestButtonClicked: function () {
                RealmApplication.vent.trigger('deleteWillContestButton:clicked');
            }
        });

        return WillContestListButtonView;

    });
