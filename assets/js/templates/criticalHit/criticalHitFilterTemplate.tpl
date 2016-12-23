<div class="container">
    <div class="page-header">
        <h1>Filters</h1>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-horizontal form-group col-md-4">
                <label class="control-label" for="normalDieButton">Die:</label>
                <button id='normalDieButton' type='button' class="btn btn-default">Normal</button>
                <button id='openEndedDieButton' type='button' class="btn btn-default">Open Ended</button>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="attackerBonus">Attacker Bonus:</label>
                <input class="col-md-2" type="number" id="attackerBonus">
            </div>
        </form>
        <form role="form" class="col-md-offset-3">
            <div class="form-group form-horizontal">
                <label class="control-label col-md-2">Type</label>
                <div class="col-md-3">
                    <select id='typeSelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="defenderBonus">Defender Bonus:</label>
                <input class="col-md-2" type="number" id="defenderBonus">
            </div>
        </form>
        <form role="form" class="col-md-offset-3">
            <div class="form-group form-horizontal">
                <label class="control-label col-md-2">Severity</label>
                <div class="col-md-3">
                    <select id='severitySelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="attackTotal">Attack Total:</label>
                <input class="col-md-2" type="number" id="attackTotal">
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="combatEncounterSelect">Combat Encounter</label>
                <div class="col-md-3">
                    <select id='combatEncounterSelect' class="form-control">
                    </select>
                </div>
                <div>
                    <label class="col-md-offset-0 control-label col-md-1">Defender</label>
                    <div class="col-md-3">
                        <select id='defenderSelect' class="form-control">
                        </select>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <button class="col-md-offset-3 col-md-2 btn btn-default" id='getCriticalButton' type='button'>Get Critical</button>
                <button class="col-md-offset-1 col-md-2 btn btn-default" id='listCritcalsButton' type='button'>List Criticals</button>
            </div>
        </form>
    </div>
</div>