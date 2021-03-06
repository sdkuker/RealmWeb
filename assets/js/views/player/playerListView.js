define(['marionette',
    'realmApplication',
    'logger',
    'utility/viewUtilities',
    'models/player/playerModel',
    "tpl!templates/player/playerListTemplate.tpl",
    'views/player/playerListItemView'], function (Marionette, RealmApplication, Logger, ViewUtilities, PlayerModel, PlayerListTemplate, PlayerView) {
    var PlayerListView = Marionette.CompositeView.extend({
        tagName : 'table',
        id : 'playerTable',
        className : 'table table-striped',
        template: PlayerListTemplate,
        childView : PlayerView,
        childViewContainer : 'tbody',
        selectedModel : '',
        initialize : function() {
            self = this;
            this.listenTo(RealmApplication.vent, 'playerListAddButton:clicked', function() {
                self.triggerAddPlayerFunction();
            });
            this.listenTo(RealmApplication.vent, 'playerListChangeButton:clicked', function() {
                self.triggerEditPlayerFunction();
            });
            this.listenTo(RealmApplication.vent, 'playerListDeleteButton:clicked', function() {
                self.triggerDeletePlayerFunction();
            });
            this.listenTo(RealmApplication.vent, 'playerListPlayerSelected', function(tableRow, model) {
                self.playerSelected(tableRow, model);
            });
            this.listenTo(this.collection, 'add', this.render);
        },
        triggerAddPlayerFunction : function() {
            RealmApplication.vent.trigger('playerListAddPlayer', new PlayerModel());
        },
        triggerEditPlayerFunction : function() {
            var model = this.collection.at($(':selected', this.$el).index());
            RealmApplication.vent.trigger('playerListChangePlayer', model);
        },
        triggerDeletePlayerFunction : function() {
            this.collection.remove(selectedModel);
            Logger.logInfo('player model deleted');
            ViewUtilities.showModalView('Informational', 'Player named: ' + selectedModel.get('name') + ' Deleted');
            selectedModel = null;
            RealmApplication.vent.trigger('viewPlayerList');
        },
        playerSelected : function(tableRow, model) {
            $(tableRow.el).siblings().removeClass('info');
            $(tableRow.el).addClass('info');
            selectedModel = model;
        }
    });

    return PlayerListView;

});
