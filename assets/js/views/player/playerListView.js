define(['marionette',
    'realmApplication',
    'models/player/playerModel',
    "tpl!templates/player/playerListTemplate.tpl",
    'views/player/playerListItemView'], function (Marionette, RealmApplication, PlayerModel, PlayerListTemplate, PlayerView) {
    var PlayerListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'playerTable',
        className : 'table table-striped',
        template: PlayerListTemplate,
        childView : PlayerView,
        childViewContainer : 'tbody',
        initialize : function() {
            self = this;
            RealmApplication.vent.on('playerListAddButton:clicked', function() {
                self.triggerAddPlayerFunction();
            });
            RealmApplication.vent.on('playerListChangeButton:clicked', function() {
                self.triggerEditPlayerFunction();
            });
            RealmApplication.vent.on('playerListDeleteButton:clicked', function() {
                self.triggerDeletePlayerFunction();
            });
            RealmApplication.vent.on('playerListPlayerSelected', function(tableRow, model) {
                self.playerSelected(tableRow, model);
            })
        },
        triggerAddPlayerFunction : function() {
            RealmApplication.vent.trigger('playerListAddPlayer', new PlayerModel());
        },
        triggerEditPlayerFunction : function() {
            var model = this.collection.at($(':selected', this.$el).index());
            RealmApplication.vent.trigger('playerListChangePlayer', model);
        },
        playerSelected : function(tableRow, model) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
        }
    });

    return PlayerListView;

});
