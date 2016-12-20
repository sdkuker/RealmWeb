<div class="container">
    <div class="page-header">
        <h1>Filters</h1>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal">
            <div class="form-group col-sm-4">
                <label class="control-label" for="normalDieButton">Die:</label>
                <button id='normalDieButton' type='button' class="btn btn-default">Normal</button>
                <button id='openEndedDieButton' type='button' class="btn btn-default">Open Ended</button>
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group col-sm-offset-2 col-sm-2">
                <div class="checkbox">
                    <label class="control-label">
                        <input type="checkbox" value="">Add to Combat?</input>
                    </label>
                </div>
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-1" for="defenderSelect">Defender</label>
                <div class="col-sm-3">
                    <select id='defenderSelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-4">
            <div class="form-group">
                <label for="attackerBonus">Attacker Bonus:</label>
                <input type="number" id="attackerBonus">
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2">Type</label>
                <div class="col-sm-3">
                    <select id='typeSelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-4">
            <div class="form-group">
                <label for="defenderBonus">Defender Bonus:</label>
                <input type="number" id="defenderBonus">
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2">Severity</label>
                <div class="col-sm-3">
                    <select id='severitySelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-5">
            <div class="form-group">
                <label for="attackTotal">Attack Total:</label>
                <input type="number" id="attackTotal">
            </div>
        </form>
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <button id='getCriticalButton' type='button' class="btn btn-default">Get Critical</button>
                <button id='listCritcalsButton' type='button' class="btn btn-default">List Criticals</button>
            </div>
        </form>
    </div>
</div>