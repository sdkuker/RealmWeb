define(['jquery', 'models/combat/characterCombatRoundStatisticModel', 'models/character/characterModel',
    'domain/combat/combatRoundAttributeDeterminer'],
    function($, CombatRoundStatisticModel, CharacterModel, CombatRoundAttributeDeterminer) {
        mocha.ui('bdd');
        var assert = chai.assert;
        var expect = chai.expect;

        /* Tests */

        describe('CombatRoundStatisticsModel', function() {

            describe('Get Hits At the End of the Round', function() {
                it('Hits at end of the round < character total hit points', function() {
                    var myModel = new CombatRoundStatisticModel();
                    var characterModel = new CharacterModel();
                    myModel.set('hitsAtStartOfRound', 100);
                    myModel.set('hitsTakenDuringRound', 5);
                    myModel.set('bleeding', 7);
                    myModel.set('regeneration', 1);
                    var stub = sinon.stub(characterModel, 'totalHitPoints', function () {return 300});

                    assert.isOk(myModel.getHitsAtEndOfRound(characterModel) === 89);

                    characterModel.totalHitPoints.restore();
                });
                it('Hits at end of the round > character total hit points', function() {
                    var myModel = new CombatRoundStatisticModel();
                    var characterModel = new CharacterModel();
                    myModel.set('hitsAtStartOfRound', 100);
                    myModel.set('hitsTakenDuringRound', 5);
                    myModel.set('bleeding', 7);
                    myModel.set('regeneration', 1);
                    var stub = sinon.stub(characterModel, 'totalHitPoints', function () {return 5});

                    assert.isOk(myModel.getHitsAtEndOfRound(characterModel) === 5);

                    characterModel.totalHitPoints.restore();
                });
                it('Hits at end of the round = character total hit points', function() {
                    var myModel = new CombatRoundStatisticModel();
                    var characterModel = new CharacterModel();
                    myModel.set('hitsAtStartOfRound', 100);
                    myModel.set('hitsTakenDuringRound', 5);
                    myModel.set('bleeding', 7);
                    myModel.set('regeneration', 1);
                    var stub = sinon.stub(characterModel, 'totalHitPoints', function () {return 89});

                    assert.isOk(myModel.getHitsAtEndOfRound(characterModel) === 89);

                    characterModel.totalHitPoints.restore();
                });

                it('Hits at end of the round missing one of the attributes', function() {
                    var myModel = new CombatRoundStatisticModel();
                    var characterModel = new CharacterModel();
                    myModel.set('hitsAtStartOfRound', 100);
                    myModel.set('hitsTakenDuringRound', 5);
                    myModel.set('bleeding', 7);
                    //regeneration is missing so will it's default value of zero
                    var stub = sinon.stub(characterModel, 'totalHitPoints', function () {return 300});

                    assert.isOk(myModel.getHitsAtEndOfRound(characterModel) === 88);

                    characterModel.totalHitPoints.restore();
                });
            });

            describe('Clone for Combat', function() {
                it('Clone for combat', function() {

                    var characterModel = new CharacterModel();
                    var characterModelStub = sinon.stub(characterModel, 'totalHitPoints', function () {return 89});
                    characterModel.set('characterID', 'anID');

                    var combatRoundDeterminerStub = sinon.stub(CombatRoundAttributeDeterminer, 'determineBaseCombatInitiative', function () {return 50});

                    var myModel = new CombatRoundStatisticModel();
                    myModel.set('totalHits', 10);
                    myModel.set('bleeding', 2);
                    myModel.set('roundsStillStunned', 3);
                    myModel.set('negativeModifier', 4);
                    myModel.set('regeneration', 5);
                    myModel.set('alertness', 6);
                    myModel.set('observation', 7);

                    var clonedStatistic = myModel.cloneForCombat(characterModel);

                    assert.equal('anID', clonedStatistic.characterID);

                    characterModel.totalHitPoints.restore();
                    CombatRoundAttributeDeterminer.determineBaseCombatInitiative.restore();
                });
            });
        });



    });