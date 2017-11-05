<div class="container">
    <div class="page-header">
        <h1>Filters</h1>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-horizontal form-group col-md-4">
                <label class="control-label" for="openEndedDieButton">Die:</label>
                <button id='openEndedDieButton' type='button' class="col-md-offset-1 btn btn-default">Open Ended</button>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="rollResult">Roll Result:</label>
                <input class="col-md-2" type="number" id="rollResult">
            </div>
        </form>
        <form role="form" class="col-md-offset-3">
            <div class="form-group form-horizontal">
                <label class="control-label col-md-2">Difficulty</label>
                <div class="col-md-3">
                    <select id='difficultySelect' class="form-control">
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="rollAdjustment">Roll Adjustment:</label>
                <input class="col-md-2" type="number" id="rollAdjustment">
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-2" for="rollTotal">Roll Total:</label>
                <input class="col-md-2" type="number" id="rollTotal">
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <button class="col-md-offset-1 col-md-2 btn btn-default" id='getManeuverButton' type='button'>Get Maneuver</button>
            </div>
        </form>
    </div>
</div>