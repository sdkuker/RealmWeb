<div class="container">
    <div class="page-header">
        <h1>Movement Maneuver</h1>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Roll Values</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-3' for="minimumRollValue">Minimum Roll Value</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="minimumRollValue" value="<%- minimumRollValue %> ">
                        </div>
                        <label class='control-label col-sm-3' for="maximumRollValue">Maximum Roll Value:</label>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id="maximumRollValue" value="<%- maximumRollValue %> ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Results</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="trivialManeuverResult">Trivial Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="trivialManeuverResult" value="<%- getTrivialManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="routineManeuverResult">Routine Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="routineManeuverResult" value="<%- getRoutineManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="easyManeuverResult">Easy Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="easyManeuverResult" value="<%- getEasyManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="lightManeuverResult">Light Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="lightManeuverResult" value="<%- getLightManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="mediumManeuverResult">Medium Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="mediumManeuverResult" value="<%- getMediumManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="hardManeuverResult">Hard Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="hardManeuverResult" value="<%- getHardManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="veryHardManeuverResult">Very Hard Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="veryHardManeuverResult" value="<%- getVeryHardManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="extremelyHardManeuverResult">Extremely Hard Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="extremelyHardManeuverResult" value="<%- getExtremelyHardManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="sheerFollyManeuverResult">Sheer Folly Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="sheerFollyManeuverResult" value="<%- getSheerFollyManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="absurdManeuverResult">Absurd Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="absurdManeuverResult" value="<%- getAbsurdManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="insaneManeuverResult">Insane Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="insaneManeuverResult" value="<%- getInsaneManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="phenomenalManeuverResult">Phenomenal Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="phenomenalManeuverResult" value="<%- getPhenomenalManeuverResult %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="virtuallyImpossibleManeuverResult">Virtually Impossible Maneuver Result:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="virtuallyImpossibleManeuverResult" value="<%- getVirtuallyImpossibleManeuverResult %> ">
                        </div>
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