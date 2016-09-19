define(['jquery', 'domain/combat/combatRoundAttributeDeterminer', 'models/character/characterModel', 'domain/die/die'],
    function($, AttributeDeterminer, CharacterModel, Die) {
    mocha.ui('bdd');
    var assert = chai.assert;
    var expect = chai.expect;

    /* Tests */

    describe('AttributeDeterminer', function() {

        describe('Combat Initiative', function() {
            it('Created the test character okay', function() {
                var myCharacter = new CharacterModel();
                assert.isOk(myCharacter);
            });
            it('Only initiative positive', function() {
                var myCharacter = new CharacterModel();
                myCharacter.set('initiative', 5);
                assert.isOk(AttributeDeterminer.determineBaseCombatInitiatieve(myCharacter) === 5);
            });
            it('Initiative and initiativeModifier positive', function() {
                var myCharacter = new CharacterModel();
                myCharacter.set('initiative', 5);
                myCharacter.set('initiativeModifier', 7);
                assert.isOk(AttributeDeterminer.determineBaseCombatInitiatieve(myCharacter) === 12);
            });
        });

    });

});