define(['marionette',
    'realmApplication',
    "tpl!templates/character/characterListItemTemplate.tpl",
    'models/character/characterModel'], function (Marionette, RealmApplication, CharacterListItemTemplate, CharacterModel) {
    var CharacterListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : CharacterModel,
        template: CharacterListItemTemplate,
        templateHelpers : function() {
            var myPlayerName = this.model.playerName();
            var myHasAdrenalDefense = this.model.hasAdrenalDefense();
            var myTotalDefensiveBonusMinuusAdrenalDefense = this.model.totalDefensiveBonusMinusAdrenalDefense();
            var myTotalDefensiveBonus = this.model.totalDefensiveBonus();
            var myHasShield = this.model.hasShield();
            var characterName = decodeURI(this.model.get('name'));
            return {
                playerName : myPlayerName,
                hasAdrenalDefense : myHasAdrenalDefense,
                totalDefensiveBonusMinusAdrenalDefense : myTotalDefensiveBonusMinuusAdrenalDefense,
                totalDefensiveBonus : myTotalDefensiveBonus,
                hasShield : myHasShield,
                characterName : characterName
            }
        },
        events : {
            'click' : 'characterSelected'
        },
        characterSelected : function(event) {
            RealmApplication.vent.trigger('characterListCharacterSelected', this, this.model);
        }
    });

    return CharacterListItemView;

});
