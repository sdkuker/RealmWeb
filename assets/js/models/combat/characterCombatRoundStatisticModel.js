define(['backbone', 'domain/combat/combatRoundAttributeDeterminer'],
    function (Backbone, CombatRoundAttributeDeterminer) {

        var CharacterCombatRoundStatisticModel = Backbone.Model.extend({
            // encounterRoundID is these two IDs separated by a dash
            defaults: {
                encounterRoundID : '',
                playerID : '',
                characterID : '',
                characterName : '',
                initiative : 0,
                alertness : 0,
                observation : 0,
                totalHits : 0,
                bleeding : 0,
                roundsStillStunned : 0,
                mustParry : 0,
                negativeModifier : 0,
                regeneration : 0,
                hitsAtStartOfRound : 0,
                hitsTakenDuringRound : 0,
                characterTotalHitPointsAtStartOfRound : 0,
                initialNumberOfCharacterClones : 0,
                totalHitsPerClone : 0,
                totalDefensiveBonus : 0,
                totalDefensiveBonusDescription : '',
                totalDefensiveBonusPlusParry : 0,
                totalDefensiveBonusPlusParryDescription : '',
                totalDefensiveBonusPlusAdrenalDefense : 0,
                totalDefensiveBonusPlusAdrenalDefenseDescription : '',
                totalDefensiveBonusPlusParryPlusAdrenalDefense : 0,
                totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription : ''
            },
            setNegativeModifier : function(negModifierValue) {
                if (negModifierValue > 0) {
                    this.set({negativeModifier: negModifierValue * -1});
                } else
                    this.set({negativeModifier : negModifierValue});
            },
            cloneForCombat : function(aCharacterModel) {
                // returns a plain JS object with most of the attributes for a CharacterCombatRoundStatisticModel
                // it can be added to an active backfire collection.
                var theReturn = {};

                var changesToCharacterTotalHits = (aCharacterModel.totalHitPoints() * this.get('initialNumberOfCharacterClones'))
                                                 - this.get('characterTotalHitPointsAtStartOfRound');
                theReturn.playerID = aCharacterModel.get('playerID');
                theReturn.characterID = aCharacterModel.get('id');
                theReturn.characterName = this.get('characterName');
                theReturn.initiative =  CombatRoundAttributeDeterminer.determineRoundInitiative(aCharacterModel);
                theReturn.characterTotalHitPointsAtStartOfRound = aCharacterModel.totalHitPoints() * this.get('initialNumberOfCharacterClones');
                theReturn.totalHits = this.get('totalHits') + changesToCharacterTotalHits;
                theReturn.hitsAtStartOfRound = this.getHitsAtEndOfRound(aCharacterModel) + changesToCharacterTotalHits;
                theReturn.bleeding = this.get('bleeding');
                theReturn.roundsStillStunned = CombatRoundAttributeDeterminer.determineNumberOfRoundsStillStunned(this.get('roundsStillStunned'));
                theReturn.mustParry = 0;
                theReturn.negativeModifier = this.get('negativeModifier');
                theReturn.regeneration = this.get('regeneration');
                theReturn.alertness = CombatRoundAttributeDeterminer.determineRoundAlertness(aCharacterModel);
                theReturn.observation = CombatRoundAttributeDeterminer.determineRoundObservation(aCharacterModel);
                theReturn.initialNumberOfCharacterClones = this.get('initialNumberOfCharacterClones');
                theReturn.totalHitsPerClone = this.get('totalHitsPerClone');
                theReturn.totalDefensiveBonus = this.get('totalDefensiveBonus');
                theReturn.totalDefensiveBonusDescription = this.get('totalDefensiveBonusDescription');
                theReturn.totalDefensiveBonusPlusParry = this.get('totalDefensiveBonusPlusParry');
                theReturn.totalDefensiveBonusPlusParryDescription = this.get('totalDefensiveBonusPlusParryDescription');
                theReturn.totalDefensiveBonusPlusAdrenalDefense = this.get('totalDefensiveBonusPlusAdrenalDefense');
                theReturn.totalDefensiveBonusPlusAdrenalDefenseDescription = this.get('totalDefensiveBonusPlusAdrenalDefenseDescription');
                theReturn.totalDefensiveBonusPlusParryPlusAdrenalDefense = this.get('totalDefensiveBonusPlusParryPlusAdrenalDefense');
                theReturn.totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription = this.get('totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription');
                
                //TODO still need to do something about the critial hits sufferred

                return theReturn;
            },
            getHitsAtEndOfRound : function(aCharacterModel) {
                var calculatedHitsAtEndOfRound = this.get('hitsAtStartOfRound') - this.get('hitsTakenDuringRound') -
                    this.get('bleeding') + this.get('regeneration');
                return (Math.min(calculatedHitsAtEndOfRound, aCharacterModel.totalHitPoints() * this.get('initialNumberOfCharacterClones')));
            },
            getTotalDefensiveBonusDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusDescription'));
            },
            setTotalDefensiveBonusDescription: function(aDescription) {
                return this.set('totalDefensiveBonusDescription', encodeURI(aDescription));
            },
            getTotalDefensiveBonusPlusParryDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusParryDescription'));
            },
            setTotalDefensiveBonusPlusParryDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusParryDescription', encodeURI(aDescription));
            },
            getTotalDefensiveBonusPlusAdrenalDefenseDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusAdrenalDefenseDescription'));
            },
            setTotalDefensiveBonusPlusAdrenalDefenseDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusAdrenalDefenseDescription', encodeURI(aDescription));
            },
            getTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription: function() {
                return decodeURI(this.get('totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription'));
            },
            setTotalDefensiveBonusPlusParryPlusAdrenalDefenseDescription: function(aDescription) {
                return this.set('totalDefensiveBonusPlusParryPlusAdrenalDefenseDescription', encodeURI(aDescription));
            }

        });

        return CharacterCombatRoundStatisticModel;

    });
