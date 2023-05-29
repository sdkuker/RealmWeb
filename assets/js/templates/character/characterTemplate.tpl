<div class="container">
    <div class="page-header">
        <h1>Character</h1>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Base Attributes</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="name">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" value="<%- characterName %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="playerSelect">Player:</label>
                        <div class="col-sm-2">
                            <select id='playerSelect' class="form-control">
                            </select>
                        </div>
                        <label class='control-label col-sm-2' for="initiative">Initiative:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="initiative" value="<%- initiative %> ">
                        </div>
                        <label class='control-label col-sm-2' for="initiativeModifier">Initiative Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="initiativeModifier" value="<%- initiativeModifier %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="level">Level:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="level" value="<%- level %> ">
                        </div>
                        <label class='control-label col-sm-2' for="hitPoints">Hit Points:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="hitPoints" value="<%- hitPoints %> ">
                        </div>
                        <label class='control-label col-sm-2' for="hitPointsModifier">Hit Point Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="hitPointsModifier" value="<%- hitPointsModifier %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="misc">Misc:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="misc" value="<%- misc %> ">
                        </div>
                        <label class='control-label col-sm-2' for="will">Will:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="will" value="<%- will %> ">
                        </div>
                        <label class='control-label col-sm-2' for="willModifier">Will Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="willModifier" value="<%- willModifier %> ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Skills</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="observationSkill">Observation:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="observationSkill" value="<%- observationSkill %> ">
                        </div>
                        <label class='control-label col-sm-2' for="perception">Perception:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="perception" value="<%- perception %> ">
                        </div>
                        <label class='control-label col-sm-2' for="stalkSkill">Stalk:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="stalkSkill" value="<%- stalkSkill %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="alertnessSkill">Alertness:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="alertnessSkill" value="<%- alertnessSkill %> ">
                        </div>
                        <label class='control-label col-sm-2' for="senseAmbushSkill">Sense Ambush:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="senseAmbushSkill" value="<%- senseAmbushSkill %> ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Defensive Attributes</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="quicknessBonus">Quickness Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="quicknessBonus" value="<%- quicknessBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="quicknessBonusDescription">Quickness Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="quicknessBonusDescription" value="<%- myQuicknessBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="racialModifier">Racial Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="racialModifier" value="<%- racialModifier %> ">
                        </div>
                        <label class='control-label col-sm-2' for="racialModifierDescription">Racial Modifier Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="racialModifierDescription" value="<%- myRacialModifierDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="armorChoice">Armor Choice:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="armorChoice" value="<%- armorChoice %> ">
                        </div>
                        <label class='control-label col-sm-2' for="armorChoiceDescription">Armor Choice Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="armorChoiceDescription" value="<%- myArmorChoiceDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="armorOnArmor">Armor on Armor:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="armorOnArmor" value="<%- armorOnArmor %> ">
                        </div>
                        <label class='control-label col-sm-2' for="armorOnArmorDescription">Armor On Armor Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="armorOnArmorDescription" value="<%- myArmorOnArmorDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="shieldChoice">Shield Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="shieldChoice" value="<%- shieldChoice %> ">
                        </div>
                        <label class='control-label col-sm-2' for="shieldChoiceDescription">Shield Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="shieldChoiceDescription" value="<%- myShieldChoiceDescription %> ">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class='control-label col-sm-2' for="bracersBonus">Bracers Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="bracersBonus" value="<%- bracersBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="bracersBonusDescription">Bracers Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="bracersBonusDescription" value="<%- myBracersBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="ringBonus">Ring Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="ringBonus" value="<%- ringBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="ringBonusDescription">Ring Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="ringBonusDescription" value="<%- myRingBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="magicalItemBonus">Magical Item Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="magicalItemBonus" value="<%- magicalItemBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="magicalItemBonusDescription">Magical Item Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="magicalItemBonusDescription" value="<%- myMagicalItemBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="martialProwessBonus">Martial Prowess Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="martialProwessBonus" value="<%- martialProwessBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="martialProwessBonusDescription">Martial Prowess Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="martialProwessBonusDescription" value="<%- myMartialProwessBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="terrainAwarenessBonus">Terrain Awareness Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="terrainAwarenessBonus" value="<%- terrainAwarenessBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="terrainAwarenessBonusDescription">Terrain Awareness Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="terrainAwarenessBonusDescription" value="<%- myTerrainAwarenessBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="zenMasterBonus">Zen Master Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="zenMasterBonus" value="<%- zenMasterBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="zenMasterBonusDescription">Zen Master Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="zenMasterBonusDescription" value="<%- myZenMasterBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="calisthenicsBonus">Calisthenics Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="calisthenicsBonus" value="<%- calisthenicsBonus %> ">
                        </div>
                        <label class='control-label col-sm-2' for="calisthenicsBonusDescription">Calisthenics Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="calisthenicsBonusDescription" value="<%- myCalisthenicsBonusDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="skillChoice1">Skill or Background Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="skillChoice1" value="<%- skillChoice1 %> ">
                        </div>
                        <label class='control-label col-sm-2' for="skillChoice1Description">Skill or Background Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="skillChoice1Description" value="<%- mySkillChoice1Description %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="skillChoice2">Skill or Background Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="skillChoice2" value="<%- skillChoice2 %> ">
                        </div>
                        <label class='control-label col-sm-2' for="skillChoice2Description">Skill or Background Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="skillChoice2Description" value="<%- mySkillChoice2Description %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="skillChoice3">Skill or Background Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="skillChoice3" value="<%- skillChoice3 %> ">
                        </div>
                        <label class='control-label col-sm-2' for="skillChoice3Description">Skill or Background Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="skillChoice3Description" value="<%- mySkillChoice3Description %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="miscItemChoice">Misc Item Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="miscItemChoice" value="<%- miscItemChoice %> ">
                        </div>
                        <label class='control-label col-sm-2' for="miscItemChoiceDescription">Misc Item Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="miscItemChoiceDescription" value="<%- myMiscItemChoiceDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="miscItemChoice2">Misc Item Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="miscItemChoice2" value="<%- miscItemChoice2 %> ">
                        </div>
                        <label class='control-label col-sm-2' for="miscItemChoice2Description">Misc Item Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="miscItemChoice2Description" value="<%- myMiscItemChoice2Description %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="specialAbility">Special Ability Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="specialAbility" value="<%- specialAbility %> ">
                        </div>
                        <label class='control-label col-sm-2' for="specialAbilityDescription">Special Ability Bonus Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="specialAbilityDescription" value="<%- mySpecialAbilityDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="weaponParry">Weapon Parry:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="weaponParry" value="<%- weaponParry %> ">
                        </div>
                        <label class='control-label col-sm-2' for="weaponParryDescription">Weapon Parry Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="weaponParryDescription" value="<%- myWeaponParryDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="adrenalDefense">Adrenal Defense:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="adrenalDefense" value="<%- adrenalDefense %> ">
                        </div>
                        <label class='control-label col-sm-2' for="adrenalDefenseDescription">Adrenal Defense Description:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="adrenalDefenseDescription" value="<%- myAdrenalDefenseDescription %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="totalDefensiveBonus">Total Defensive Bonus:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="totalDefensiveBonus" readOnly data-toggle="tooltip" 
                                    title="<%- myTotalDefensiveBonusDescription %>"  value="<%- myTotalDefensiveBonus %> ">
                        </div>
                        <p class="col-sm-2">Must save to update total defensive bonus</p>
                    </div>
                </form>
            </div>
        </div>
    <form>
        <div>
            <button id='saveButton' type='button' class="btn btn-default">Save</button>
            <button id='deleteButton' type='button' class="btn btn-default">Delete</button>
            <button id='cancelButton' type='button' class="btn btn-default">Cancel</button>
        </div>
    </form>
</div>