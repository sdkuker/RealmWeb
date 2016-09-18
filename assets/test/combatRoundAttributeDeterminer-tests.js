define(['jquery', 'assets/js/domain/combat/combatRoundAttributeDeterminer', 'assets/js/models/character/characterModel'],
    function($, AttributeDeterminer, CharacterModel) {
    mocha.ui('bdd');
    var assert = chai.assert;
    var expect = chai.expect;

    /* Tests */

    describe('determineBaseCombatInitiatieve', function() {

        describe('GenerateRandomNumber should generate numbers in the right range', function() {
            var myCharacter = new CharacterModel();
            it('Created the test character okay', function() {
                assert.isOK(myCharacter);
            });

        });

    });


});