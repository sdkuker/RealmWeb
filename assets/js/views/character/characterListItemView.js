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
            var myTotalDefensiveBonus = this.model.totalDefensiveBonus();
            var totalDefensiveBonusDescription = this.model.totalDefensiveBonusDescription();

            var myTotalDefensiveBonusPlusParry = this.model.totalDefensiveBonusPlusParry();
            var myTotalDefensiveBonusPlusParryDescription = this.model.totalDefensiveBonusPlusParryDescription();
            var myTotalDefensiveBonusPlusAdrenalDefense = this.model.totalDefensiveBonusPlusAdrenalDefense();
            var myTotalDefensiveBonusPlusAdrenalDefenseDescription = this.model.totalDefensiveBonusPlusAdrenalDefenseDescription();
            var myTotalDefensiveBonusPlusParryPlusAdrenalDefense = this.model.totalDefensiveBonusPlusParryPlusAdrenalDefense();
            var myTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription = this.model.totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription();

            var myHasShield = this.model.hasShield();
            var characterName = decodeURI(this.model.get('name'));
            return {
                playerName : myPlayerName,
                hasAdrenalDefense : myHasAdrenalDefense,
                totalDefensiveBonus : myTotalDefensiveBonus,
                hasShield : myHasShield,
                characterName : characterName,
                totalDefensiveBonusDescription: totalDefensiveBonusDescription,
                totalDefensiveBonusPlusParry: myTotalDefensiveBonusPlusParry,
                totalDefensiveBonusPlusParryDescription: myTotalDefensiveBonusPlusParryDescription,
                totalDefensiveBonusPlusAdrenalDefense: myTotalDefensiveBonusPlusAdrenalDefense,
                totalDefensiveBonusPlusAdrenalDefenseDescription: myTotalDefensiveBonusPlusAdrenalDefenseDescription,
                totalDefensiveBonusPlusParryPlusAdrenalDefense: myTotalDefensiveBonusPlusParryPlusAdrenalDefense,
                totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription: myTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription

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
