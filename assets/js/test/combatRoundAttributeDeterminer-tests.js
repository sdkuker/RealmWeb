define(['jquery', 'domain/combat/combatRoundAttributeDeterminer', 'models/character/characterModel', 'domain/die/die'],
    function($, AttributeDeterminer, CharacterModel, Die) {
    mocha.ui('bdd');
    var assert = chai.assert;
    var expect = chai.expect;

    /* Tests */

    describe('AttributeDeterminer', function() {

        describe('AttributeDeterminer should generate numbers in the right range', function() {
            var myCharacter = new CharacterModel();
            it('Created the test character okay', function() {
                assert.isOk(myCharacter);
            });
        });

    });
        
});