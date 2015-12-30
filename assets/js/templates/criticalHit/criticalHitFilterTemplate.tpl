<div class="container">
    <div class="page-header">
        <h1>Filters</h1>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <label for="normalDieButton">Die:</label>
                <button id='normalDieButton' type='button' class="btn btn-default">Normal</button>
                <button id='openEndedDieButton' type='button' class="btn btn-default">Open Ended</button>
            </div>
        </form>
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <label for="defender">Defender:</label>
                <input type="text" id="defender">
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <label for="attackerBonus">Attacker Bonus:</label>
                <input type="number" id="attackerBonus">
            </div>
        </form>
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <label for="typeButton">Type</label>
                <button id='typeButton' type='button' class="btn btn-default">Type</button>
                <label for="severityButton">Severity</label>
                <button id='severityButton' type='button' class="btn btn-default">Severity</button>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <label for="defenderBonus">Defender Bonus:</label>
                <input type="number" id="defenderBonus">
            </div>
        </form>
        <form role="form" class="form-horizontal col-sm-6">
            <div class="form-group">
                <button id='getCriticalButton' type='button' class="btn btn-default">Get Critical</button>
                <button id='listCritcalsButton' type='button' class="btn btn-default">List Criticals</button>
            </div>
        </form>
    </div>
    <div>
        <form role="form" class="form-horizontal">
            <div class="form-group">
                <label for="attackTotal">Attack Total:</label>
                <input type="number" id="attackTotal">
            </div>
        </form>
    </div>
</div>