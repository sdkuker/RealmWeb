<div class="container">
    <div class="page-header">
        <h1>Filters</h1>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal">
            <div class="form-group col-lg-4">
                <label class="control-label" for="normalDieButton">Die:</label>
                <button id='normalDieButton' type='button' class="btn btn-default">Normal</button>
                <button id='openEndedDieButton' type='button' class="btn btn-default">Open Ended</button>
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group col-lg-offset-2 col-lg-2">
                <div class="checkbox">
                    <label class="control-label">
                        <input type="checkbox" value="">Add to Combat?</input>
                    </label>
                </div>
            </div>
        </form>
        <form role="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-lg-1" for="defenderSelect">Defender</label>
                <div class="col-lg-3">
                    <select id='defenderSelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-lg-2" for="attackerBonus">Attacker Bonus:</label>
                <input class="col-lg-2" type="number" id="attackerBonus">
            </div>
        </form>
        <form role="form" class="col-lg-offset-3">
            <div class="form-group form-horizontal">
                <label class="control-label col-lg-2">Type</label>
                <div class="col-lg-3">
                    <select id='typeSelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-lg-2" for="defenderBonus">Defender Bonus:</label>
                <input class="col-lg-2" type="number" id="defenderBonus">
            </div>
        </form>
        <form role="form" class="col-lg-offset-3">
            <div class="form-group form-horizontal">
                <label class="control-label col-lg-2">Severity</label>
                <div class="col-lg-3">
                    <select id='severitySelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-lg-2" for="attackTotal">Attack Total:</label>
                <input class="col-lg-2" type="number" id="attackTotal">
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <button class="col-lg-offset-3 col-lg-2" id='getCriticalButton' type='button' class="btn btn-default">Get Critical</button>
                <button class="col-lg-offset-1 col-lg-2" id='listCritcalsButton' type='button' class="btn btn-default">List Criticals</button>
            </div>
        </form>
    </div>
</div>