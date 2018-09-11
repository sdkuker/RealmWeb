define(['jquery',
     'marionette',
    'realmApplication',
    'utility/viewUtilities',
    "tpl!templates/character/characterListItemTemplate.tpl",
    'models/character/characterModel'], function ($, Marionette, RealmApplication, ViewUtilities, CharacterListItemTemplate, CharacterModel) {
    var CharacterListItemView = Marionette.ItemView.extend({
        tagName : 'tr',
        model : CharacterModel,
        template: CharacterListItemTemplate,
        templateHelpers : function() {
            var myPlayerName = this.model.playerName();
            var myHasAdrenalDefense = this.model.hasAdrenalDefense();
            var myTotalDefensiveBonusMinuusAdrenalDefense = this.model.totalDefensiveBonusMinusAdrenalDefense();
            var myTotalDefensiveBonusMinuusAdrenalDefenseAndWeaponParry =
                this.model.totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry();
            var myTotalDefensiveBonus = this.model.totalDefensiveBonus();
            var totalDefensiveBonusDescription = this.model.totalDefensiveBonusDescription();
            var myHasShield = this.model.hasShield();
            var characterName = decodeURI(this.model.get('name'));
            return {
                playerName : myPlayerName,
                hasAdrenalDefense : myHasAdrenalDefense,
                totalDefensiveBonusMinusAdrenalDefense : myTotalDefensiveBonusMinuusAdrenalDefense,
                totalDefensiveBonusMinusAdrenalDefenseAndWeaponParry :
                    myTotalDefensiveBonusMinuusAdrenalDefenseAndWeaponParry,
                totalDefensiveBonus : myTotalDefensiveBonus,
                hasShield : myHasShield,
                characterName : characterName,
                totalDefensiveBonusDescription: totalDefensiveBonusDescription
            }
        },
        events : {
            'click' : 'characterSelected'
        },
        onRender: function() {
           this.$el.find('[data-toggle="tooltip"]').tooltip();
        },
        characterSelected : function(event) {
            RealmApplication.vent.trigger('characterListCharacterSelected', this, this.model);
        }
    });

    return CharacterListItemView;

});
